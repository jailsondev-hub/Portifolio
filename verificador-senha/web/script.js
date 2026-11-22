 const SENHAS_COMUNS = ["123456", "password", "senha123", "qwerty", "12345678"];

    const campo = document.getElementById("senha");
    const botaoMostrar = document.getElementById("mostrar");
    const barra = document.getElementById("barra");
    const nivelTexto = document.getElementById("nivel");

    function marcar(id, ok, texto) {
      const item = document.getElementById(id);
      item.textContent = (ok ? "✓ " : "✗ ") + texto;
      item.classList.toggle("ok", ok);
    }

    function verificar() {
      const senha = campo.value;

      const regras = {
        tamanho: senha.length >= 8,
        letras: /[a-z]/.test(senha) && /[A-Z]/.test(senha),
        numero: /\d/.test(senha),
        simbolo: /[^\w\s]/.test(senha),
      };

      marcar("r-tamanho", regras.tamanho, "Mínimo de 8 caracteres");
      marcar("r-letras", regras.letras, "Letras maiúsculas e minúsculas");
      marcar("r-numero", regras.numero, "Pelo menos um número");
      marcar("r-simbolo", regras.simbolo, "Pelo menos um símbolo");

      let pontos = Object.values(regras).filter(Boolean).length;

      if (SENHAS_COMUNS.includes(senha.toLowerCase())) {
        pontos = 0;
      }

      const niveis = [
        { texto: "Muito fraca", cor: "#ef4444" },
        { texto: "Fraca", cor: "#f97316" },
        { texto: "Média", cor: "#eab308" },
        { texto: "Boa", cor: "#84cc16" },
        { texto: "Forte", cor: "#22c55e" },
      ];

      if (senha === "") {
        barra.style.width = "0";
        nivelTexto.textContent = "Digite uma senha";
        return;
      }

      barra.style.width = (pontos / 4) * 100 + "%";
      barra.style.background = niveis[pontos].cor;
      nivelTexto.textContent = niveis[pontos].texto;
    }

    campo.addEventListener("input", verificar);

    botaoMostrar.addEventListener("click", () => {
      const escondida = campo.type === "password";
      campo.type = escondida ? "text" : "password";
      botaoMostrar.textContent = escondida ? "Esconder" : "Mostrar";
    });