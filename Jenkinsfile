pipeline {
          agent {
                    kubernetes {
                              inheritFrom 'k6'
                    }
          }
          parameters {
                    string(name: 'K6_SCRIPT', defaultValue: 'load_test.js', description: 'K6 script to execute')
                    choice(name: 'TEST_TYPE', choices: ['smoke', 'load', 'stress'], description: 'Type of test')
                    booleanParam(name: 'DEBUG_MODE', defaultValue: false, description: 'Enable debug mode')
          }
          stages {
                    stage('Run k6 Test') {
                              steps {
                                        script {
                                                  echo "Running test: ${params.TEST_TYPE}"
                                                  sh "docker run --rm -v $(pwd):/scripts grafana/k6 run /scripts/${params.K6_SCRIPT}"
                                        }
                              }
                    }
          }
}
