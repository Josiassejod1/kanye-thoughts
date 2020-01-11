package server
import (
  "net/http"
	"crypto/tls"
	"time"
	"log"
	"os"
)
func New(mux *http.ServeMux, serverAddress string) *http.Server {
	/*
		https://blog.cloudflare.com/exposing-go-on-the-internet/
	*/

	tlsConfig := &tls.Config{
		PreferServerCipherSuites: true,
		CurvePreferences: []tls.CurveID{
			tls.CurveP256,
			tls.X25519,
		},

		MinVersion: tls.VersionTLS12,
		CipherSuites: []uint16{
			tls.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305, // Go 1.8 only
			tls.TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,   // Go 1.8 only
			tls.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
			tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,

			// Best disabled, as they don't provide Forward Secrecy,
			// but might be necessary for some clients
			// tls.TLS_RSA_WITH_AES_256_GCM_SHA384,
			// tls.TLS_RSA_WITH_AES_128_GCM_SHA256,
		},
	}

	//Custom Settings for Server
	return &http.Server{
		Addr: serverAddress,
		ReadTimeout: 5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout: 120 * time.Second,
		TLSConfig: tlsConfig,
		Handler: mux,
	}
}
