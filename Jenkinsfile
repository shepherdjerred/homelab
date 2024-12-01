pipeline {
    agent {
        kubernetes {
            idleMinutes 30
            defaultContainer 'earthly'
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
                    - name: earthly
                      image: earthly/earthly
                      env:
                      - name: NO_BUILDKIT
                        value: 1
                      - name: FORCE_COLOR
                        value: 1
                      command: ["sleep"]
                      args: ["1h"]
'''
        }
    }

    options {
        ansiColor('xterm')
    }

    environment {
        EARTHLY_TOKEN = credentials('EARTHLY_TOKEN')
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
              // TODO: can we notify ArgoCD to sync?
              sh 'earthly --sat=lamport --org=sjerred --ci --push +ci --version=1.0.$BUILD_NUMBER-0 --git_sha=$GIT_COMMIT'
            }
        }
    }
}
