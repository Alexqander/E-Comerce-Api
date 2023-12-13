pipeline {
    agent any

    stages {
        stage('📦 Construir Imagen') {
            steps {
                script {
                    // Construye la imagen de Docker para la aplicación
                    sh 'docker-compose build app'
                }
            }
        }

        stage('📒 Iniciar Base de Datos') {
            steps {
                script {
                    // Inicia solo el servicio de base de datos con Docker Compose
                    sh 'docker-compose up --build -d postgres'
                }
            }
        }

        stage(' ⚙️ Ejecutar Migración') {
            steps {
                script {
                    // Ejecuta las migraciones de la base de datos
                    // Asegúrate de que este comando se ejecute dentro del contexto adecuado donde pueda acceder a la base de datos
                    sh 'docker-compose run --rm app npm run migrate'
                }
            }
        }

        stage('📊 Cargar Datos Iniciales') {
            steps {
                script {
                    // Ejecuta el comando para cargar datos iniciales
                    sh 'docker-compose run app npm run data'
                }
            }
        }

        stage('🔍 Análisis SonarQube') {
            steps {
                withSonarQubeEnv('Fast-shop-api') {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('🚀 Desplegar Aplicación') {
            steps {
                script {
                    // Construye y despliega la aplicación
                   sh 'docker-compose up -d app'
                }
            }
        }
    }

    post {
        always {
            // Pasos a ejecutar después de completar el pipeline, como limpieza
             echo 'Job finalizado ya vete a dormir 👶'
        }
    }
}
