pipeline {
  agent any
  stages {
    stage('Executing Shell Script') {
      steps {
        script {
          sshagent(credentials: ['"${credentials}"']) {
            sh '''
              ssh -t -t ${userName}@${hostIP} -o StrictHostKeyChecking=no << EOF
              ${listOfCommands}
              logout
              EOF
              '''
          }
        }
      }
    }
  }
}
