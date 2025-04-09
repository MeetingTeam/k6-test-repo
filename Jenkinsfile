def k6RepoName = "k6-test-repo"
def mainBranch ="main"

pipeline {
          agent {
                    kubernetes {
                              inheritFrom 'k6'
                    }
          }
          parameters {
                    string(name: 'SCRIPT_PATH', defaultValue: 'load_test.js', description: 'K6 script to execute')
                    string(name: 'TEST_NAME', defaultValue: '', description: 'Name to distinguish tests')
          }
          stages {
                    stage("Clone k6-test-repo"){
                              steps{
                                       withCredentials([
                                                  usernamePassword(
                                                            credentialsId: githubAccount, 
                                                            passwordVariable: 'GIT_PASS', 
                                                            usernameVariable: 'GIT_USER'
                                                  )
                                        ]) {
                                                  sh "
                                                            git clone https://\${GIT_USER}:\${GIT_PASS}@github.com/MeetingTeam/${k6RepoName}.git --branch ${mainBranch}
                                                  "		
				        }
                              }
                    }
                    stage('Run k6 Test') {
                              steps {
                                        container("k6"){
                                                  script {
                                                            echo "Running test: ${params.TEST_NAME} from script ${params.SCRIPT_PATH}"
                                                            sh "k6 run ${k6RepoName}/${params.SCRIPT_PATH}"
                                                  }
                                        }
                              }
                    }
          }
}
