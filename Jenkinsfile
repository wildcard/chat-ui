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
            }
        }
    }
    post {
        always {
            junit 'junit.xml'
        }
        success {
            sh 'tar -zcvf build.tar.gz build'
                archiveArtifacts artifacts: 'build.tar.gz',            fingerprint: true
        }
    }
    environment {
        CI = 'true'
    }
}
