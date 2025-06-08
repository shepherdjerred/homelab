FROM ubuntu:noble@sha256:6015f66923d7afbc53558d7ccffd325d43b4e249f41a6e93eef074c9505d2233

RUN apt update -y && apt install -y gpg wget curl git
RUN install -dm 755 /etc/apt/keyrings
RUN wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor > /etc/apt/keyrings/mise-archive-keyring.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg arch=amd64] https://mise.jdx.dev/deb stable main" > /etc/apt/sources.list.d/mise.list
RUN apt update
RUN apt install -y mise

RUN echo 'eval "$(mise activate bash --shims)"' >> ~/.bash_profile
RUN echo 'eval "$(mise activate bash)"' >> ~/.bashrc

RUN mise global bun@latest
RUN mise global deno@latest
RUN mise global python@latest
RUN mise global go@latest
RUN mise install
RUN mise reshim

RUN /root/.local/share/mise/shims/pip install pre-commit
RUN /root/.local/share/mise/shims/go install golang.stackrox.io/kube-linter/cmd/kube-linter@latest

RUN apt-get update
RUN apt-get install -y apt-transport-https ca-certificates curl gnupg
RUN curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
RUN chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg
RUN echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.31/deb/ /' > /etc/apt/sources.list.d/kubernetes.list
RUN chmod 644 /etc/apt/sources.list.d/kubernetes.list
RUN apt-get update
RUN apt-get install -y kubectl


RUN curl -fsSL https://dl.dagger.io/dagger/install.sh | BIN_DIR=/usr/local/bin sh
