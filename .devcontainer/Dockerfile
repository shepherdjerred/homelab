FROM ubuntu:noble@sha256:b59d21599a2b151e23eea5f6602f4af4d7d31c4e236d22bf0b62b86d2e386b8f

RUN apt update -y && apt install -y gpg wget curl git
RUN install -dm 755 /etc/apt/keyrings
RUN wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor > /etc/apt/keyrings/mise-archive-keyring.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg arch=amd64] https://mise.jdx.dev/deb stable main" > /etc/apt/sources.list.d/mise.list
RUN apt update
RUN apt install -y mise

RUN echo 'eval "$(mise activate bash --shims)"' >> ~/.bash_profile
RUN echo 'eval "$(mise activate bash)"' >> ~/.bashrc

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
