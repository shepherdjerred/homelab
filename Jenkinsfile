pipeline {
    agent {
        kubernetes {
            defaultContainer 'dind'
            inheritFrom 'default'
            yaml '''
            spec:
                containers:
                    - name: tailscale
                      image: tailscale/tailscale
                      securityContext:
                        privileged: true
                      env:
                      - name: TS_AUTHKEY
                        valueFrom:
                          secretKeyRef:
                            name: tailscale-auth-key
                            key: TS_AUTHKEY
                      - name: TS_ACCEPT_DNS
                        value: true
                      - name: TS_KUBE_SECRET
                        value:
                      - name: TS_USERSPACE
                        value: false
                    - name: dind
                      image: docker:dind
                      securityContext:
                        privileged: true
                      command: ["sleep"]
                      args: ["1h"]
'''
        }
    }

    options {
        ansiColor('xterm')
    }

    environment {
        ARGOCD_TOKEN = credentials('ARGOCD_TOKEN')
        // DAGGER_CLOUD_TOKEN = credentials('DAGGER_CLOUD_TOKEN')
        DAGGER_VERSION = '0.16.2'
        PATH = "/tmp/dagger/bin:$PATH"
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                wget -qO- https://dl.dagger.io/dagger/install.sh | BIN_DIR=/tmp/dagger/bin DAGGER_VERSION=$DAGGER_VERSION sh
                dagger call build --source=./cdk8s export --path=dist/
                '''
            }
        }
        stage('Publish') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main'
                }
            }
            steps {
                sh '''
                curl -fsSL https://dl.dagger.io/dagger/install.sh | BIN_DIR=/tmp/dagger/bin DAGGER_VERSION=$DAGGER_VERSION sh
                dagger call publish --source=./cdk8s export --path=dist/
                '''
            }
        }
    }
}
