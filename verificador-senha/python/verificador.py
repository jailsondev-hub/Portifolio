import re

with open("senhas_comuns.txt", encoding="utf-8") as arquivo:
    SENHAS_COMUNS ={linha.strip().lower() for linha in arquivo}

def verificar_senha(senha):
    pontos = 0
    faltando = []

    if len(senha) >= 8:
        pontos += 1
    else:
        faltando.append("mínimo de 8 caracteres")

    if re.search(r"[a-z]", senha) and re.search(r"[A-Z]", senha):
        pontos += 1
    else:
        faltando.append("letras maiúsculas e minúsculas")

    if re.search(r"\d", senha):
        pontos +=1
    else:
        faltando.append("pelo menos um número")

    if re.search(r"[^\w\s]", senha):
        pontos += 1
    else:
        faltando.append("pelo menos um símbolo")

    if senha.lower() in SENHAS_COMUNS:
        pontos = 0
        faltando.append("não use senhas comuns")

    nivel = {0: "muito franca", 1: "fraca", 2: "média", 3: "boa", 4: "forte"}[pontos]
    return nivel, faltando

from getpass import getpass

while True:
    senha = getpass("Digite uma senha (ou 'sair'): ")
    if senha.lower() == "sair":
        break
    nivel, faltando = verificar_senha(senha)
    print(f"Senha {nivel}")
    for item in faltando:
        print(f"falta: {item}")
    