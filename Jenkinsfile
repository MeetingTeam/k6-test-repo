def k6RepoName = "k6-test-repo"
def mainBranch ="main"

def githubAccount = 'github'

pipeline {
          agent {
                    kubernetes {
                              inheritFrom 'k6'
                    }
          }
          parameters {
                    string(name: 'SCRIPT_PATH', defaultValue: 'frontend-test.js', description: 'K6 script to execute')
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
                                                  sh "git clone https://\${GIT_USER}:\${GIT_PASS}@github.com/MeetingTeam/${k6RepoName}.git --branch ${mainBranch}"		
				}
                              }
                    }
                    stage('Run k6 Test') {
                              steps {
                                        container("k6"){
                                                  script {
                                                            echo "Running k6 script: ${k6RepoName}/${params.SCRIPT_PATH}"
                                                            sh "cat ${k6RepoName}/${params.SCRIPT_PATH}"
                                                            sh "k6 run ${k6RepoName}/${params.SCRIPT_PATH}"
                                                  }
                                        }
                              }
                    }
          }
}
