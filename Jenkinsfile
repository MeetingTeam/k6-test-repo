def k6RepoName = "k6-test-repo"
def mainBranch ="main"

def githubAccount = 'github'

def k6ReportFile = "k6_report.txt"

pipeline {
          agent {
                    kubernetes {
                              inheritFrom 'k6'
                    }
          }
          parameters {
                    string(name: 'SCRIPT_PATH', defaultValue: 'frontend_test.js', description: 'K6 script to execute')
          }
          stages {
                    stage('Run k6 Test') {
                              steps {
                                        container("k6"){
                                                  echo "Running k6 script: ${params.SCRIPT_PATH}"
                                                  sh "cat ${params.SCRIPT_PATH}"
                                                  sh "k6 run --out csv=${k6ReportFile} ${params.SCRIPT_PATH}"
                                        }
                              }
                    }
          }
          post {
                    always {
                      archiveArtifacts artifacts: k6ReportFile, allowEmptyArchive: true, fingerprint: true
                    }
          }
}
