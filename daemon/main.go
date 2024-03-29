/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/go-yaml/yaml"
)

type templateConfig struct {
	Name        string   `yaml:"name"`
	Version     string   `yaml:"version"`
	Description string   `yaml:"description"`
	Logo        string   `yaml:"image"`
	From        string   `yaml:"from"`
	Scripts     []string `yaml:"scripts"`
}

type routineApp struct {
	AppName    string `json:"appName"`
	FolderPath string `json:"folderPath"`
	Template   string `json:"template"`
	Vcs        string `json:"vcs"`
}

var (
	listOftemplates []templateConfig
	port            string = ":4200"
	isLoaded        bool   = false
)

func createRoutineApp(appName string, folderPath string, template string) error {
	if appName == "" {
		return fmt.Errorf("App Name is required")
	}
	if folderPath == "" {
		return fmt.Errorf("Folder Path is required")
	}
	if !strings.HasSuffix(folderPath, "/") {
		return fmt.Errorf("%s should end with /", folderPath)
	}

	if template == "" {
		return fmt.Errorf("Template is required")
	}

	fmt.Printf(
		"The given template %s loaded successfully ✓ \n", template,
	)

	// example : /home/getspooky/Demo/my-app
	folderPath = folderPath + appName

	config, err := ymlContent(template + ".yml")

	// make sure that all given url start with file or https?
	_, err = regexp.MatchString("^(https://github.com).+(.git)$", config.From)
	fmt.Printf(
		"Cloning origin template %s... \n", template,
	)

	if err != nil {
		log.Fatal("URL must be cloned from github or local file")
	}

	_, err = exec.Command("git", "clone", config.From, folderPath).Output()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Attemp to init git respository... \n")
	// Init Git repository.
	outputGit, err := exec.Command("git", "init").Output()
	fmt.Print(string(outputGit))

	fmt.Printf("Installing scripts.. \n")

	exec.Command("cd", folderPath).Run()

	for _, script := range config.Scripts {
		args := strings.Split(script, " ")
		outScript, _ := exec.Command(args[0], args[1:]...).Output()
		fmt.Println(string(outScript))
	}

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Template successfully installed")

	return nil

}

func ymlContent(template string) (templateConfig, error) {
	var config templateConfig

	path, _ := filepath.Abs("templates/" + template)
	file, _ := os.Open(path)

	yamlFile, err := ioutil.ReadAll(file)
	if err != nil {
		return templateConfig{}, fmt.Errorf("Template not found")
	}

	// read content from templates
	err = yaml.Unmarshal(yamlFile, &config)
	if err != nil {
		return templateConfig{}, err
	}

	return config, nil

}

func main() {
	http.HandleFunc("/", helloServer)
	http.HandleFunc("/sandbox/templates", getSandboxTemplates)
	http.HandleFunc("/build/sandbox", buildSandboxTemplate)
	http.HandleFunc("/import/template", uploadNewYmlTempate)
	http.ListenAndServe(port, nil)
}

func helloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello Routine Daemon, %s! \n", r.URL.Path[1:])
}

func buildSandboxTemplate(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	switch r.Method {
	case "POST":
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			return
		}
		//var data templateConfig
		// return the string response containing the request body
		bodyBytes, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Fatal(err)
		}
		// Convert response body to string
		bodyString := string(bodyBytes)
		fmt.Println("API Response as String:\n" + bodyString)
		// Convert response body to template struct
		var routineStruct routineApp
		err = json.Unmarshal(bodyBytes, &routineStruct)

		if err != nil {
			log.Fatal(err)
		}

		// create routine app
		createRoutineApp(routineStruct.AppName, routineStruct.FolderPath, routineStruct.Template)

		defer r.Body.Close()
		break
	default:
		fmt.Fprintf(w, "Sorry, only POST methods are supported.")
		break
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func uploadNewYmlTempate(w http.ResponseWriter, r *http.Request) {
	file, handler, err := r.FormFile("file")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	path, _ := filepath.Abs("templates/" + handler.Filename)
	f, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	io.Copy(f, file)
	// don't use cache system.
	isLoaded = true
}

func getSandboxTemplates(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	if !isLoaded {
		files, err := ioutil.ReadDir("templates/")

		if err != nil {
			log.Fatal(err)
		}

		for _, f := range files {
			config, err := ymlContent(f.Name())

			if err != nil {
				log.Fatal(err)
			}

			p := templateConfig{
				Name:        config.Name,
				From:        config.From,
				Description: config.Description,
				Logo:        config.Logo,
				Scripts:     config.Scripts,
				Version:     config.Version,
			}
			// add template data to map
			listOftemplates = append(listOftemplates, p)

			isLoaded = true

		}
	}

	json.NewEncoder(w).Encode(listOftemplates)

}
