package main

import (
	"fmt"
	"net/http"
)

const message = "Hello World"

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(message))
	})
	http.ListenAndServe(":8080", mux)
	fmt.Println("Hello world")
}
