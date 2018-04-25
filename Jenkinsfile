pipeline {
  agent {
    docker {
      image 'node'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
}