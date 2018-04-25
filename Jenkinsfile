pipeline {
  agent {
    docker {
      image 'node'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('install') {
      steps {
        sh 'npm i'
      }
    }
    stage('test') {
      steps {
        sh 'npm test -- --ci --testResultsProcessor="jest-junit" '
        junit 'junit.xml' 
      }
    }
  }
  environment {
    CI = 'true'
  }
}
