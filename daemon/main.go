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
	"fmt"
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

var (
	listOftemplates []templateConfig
	port            string = ":8080"
	cache           bool   = false
)

func createRoutineApp(appName string, folderPath string, template string) error {
	if appName == "" {
		return fmt.Errorf("App Name is required")
	}
	if folderPath == "" {
		return fmt.Errorf("Folder Path is required")
	}
	if template == "" {
		return fmt.Errorf("Template is required")
	}

	fmt.Printf(
		"The given template %s loaded successfully ✓ \n", template,
	)

	config, err := ymlContent(template)

	// make sure that all given url start with file or https?
	_, err = regexp.MatchString("^(https://github.com).+$", config.From)
	fmt.Printf(
		"Cloning origin template %s... \n", template,
	)

	if err != nil {
		log.Fatal("URL must be cloned from github or local file")
	}

	outputClone, err := exec.Command("git", "clone", config.From, folderPath).Output()
	fmt.Print(string(outputClone))

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
		fmt.Print(args)
		outScript, _ := exec.Command(args[0], args[1:]...).Output()
		fmt.Print(string(outScript))
	}

	if err != nil {
		log.Fatal(err)
	}

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
	http.ListenAndServe(port, nil)
}

func helloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello Routine Daemon, %s! \n", r.URL.Path[1:])
}

func getSandboxTemplates(w http.ResponseWriter, r *http.Request) {

	if !cache {
		files, err := ioutil.ReadDir("templates/")

		if err != nil {
			log.Fatal(err)
		}

		for _, f := range files {
			fmt.Print(f.Name())
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

			// using cache
			cache = true

		}
	}

	yaml.NewEncoder(w).Encode(listOftemplates)

}
