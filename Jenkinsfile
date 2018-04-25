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
        stage('build') {
            steps {
                sh 'npm run build'
            }
        }    
    }
    post {
        success {
            echo 'I succeeeded!'
            slackSend channel: '#ops-room',
                  color: 'good',
                  message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."
            sh 'tar -zcvf build.tar.gz build'
            archiveArtifacts artifacts: 'build.tar.gz', fingerprint: true
            echo 'Placeholder for deploy script'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
        changed {
            echo 'Things were different before...'
        }
        cleanup {
             deleteDir()
        }
    }
    environment {
        CI = 'true'
    }
}
