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
	"net/http"
)

var (
	port string = ":8080"
)

func main() {
	http.HandleFunc("/", helloServer)
	http.ListenAndServe(port, nil)
}

func helloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello Routine Daemon, %s! \n", r.URL.Path[1:])
	fmt.Fprintf(w, "Running on , %s! \n", port)
}
