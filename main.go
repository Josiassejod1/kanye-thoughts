package main

import (
	"fmt"
	"net/http"
	"log"
	"os"
	"server"
	"github.com/joho/godotenv"
)

const message = "Hello World"

func init() {
	if err :=godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(message))
	})

	serverAddress, exists := os.LookupEnv("SERVER_ADDRESS")

	if exists {
		fmt.Println("env set")
	}
	srv := server.New(mux, serverAddress)
	err := srv.ListenAndServe()

	if err != nil {
		log.Fatalf("server failed to start: %v", err)
	}
	fmt.Println("Hello world")
}
