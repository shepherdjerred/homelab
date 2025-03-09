pipeline {
    agent {
    }

    options {
        ansiColor('xterm')
    }

    environment {
        EARTHLY_TOKEN = credentials('EARTHLY_TOKEN')
        ARGOCD_TOKEN = credentials('ARGOCD_TOKEN')
    }

    stages {
        stage('Build') {
            steps {
              sh 'earthly --sat=lamport --org=sjerred --ci +ci --version=1.0.$BUILD_NUMBER-0 --git_sha=$GIT_COMMIT'
            }
        }
        stage('Publish') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main'
                }
            }
            steps {
              sh 'earthly --sat=lamport --org=sjerred --ci --push --secret ARGOCD_TOKEN +ci --version=1.0.$BUILD_NUMBER-0 --git_sha=$GIT_COMMIT'
            }
        }
    }
}
