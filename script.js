let usuarios = []; // Array para armazenar usuários
let usuarioLogado = null; // Variável para armazenar o usuário logado
const livros = [
    { titulo: "Título do Livro 1", descricao: "Descrição do livro 1. Aprenda sobre..." },
    { titulo: "Título do Livro 2", descricao: "Descrição do livro 2. Explore o mundo de..." },
    { titulo: "Título do Livro 3", descricao: "Descrição do livro 3. Entenda os conceitos de..." },
    { titulo: "Título do Livro 4", descricao: "Descrição do livro 4. Aprofunde-se em..." },
    { titulo: "Título do Livro 5", descricao: "Descrição do livro 5. Aprenda sobre..." },
    { titulo: "Título do Livro 6", descricao: "Descrição do livro 6. Explore o mundo de..." },
    { titulo: "Título do Livro 7", descricao: "Descrição do livro 7. Entenda os conceitos de..." },
    { titulo: "Título do Livro 8", descricao: "Descrição do livro 8. Aprofunde-se em..." }
];

// Carregar livros de teste
function carregarLivrosTestes() {
    const livrosTestesContainer = document.getElementById("livrosTestesContainer");
    livrosTestesContainer.innerHTML = ''; // Limpar o container
    const livrosTestes = livros.slice(0, 4); // Exibir apenas os primeiros 4 livros como teste
    livrosTestes.forEach(livro => {
        const livroElement = document.createElement('div');
        livroElement.className = 'livro';
        livroElement.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>${livro.descricao}</p>
            <button class="comprarBtn">Comprar</button>
        `;
        livrosTestesContainer.appendChild(livroElement);
    });
}

// Carregar todos os livros disponíveis
function carregarLivrosDisponiveis() {
    const livrosContainer = document.getElementById("livrosContainer");
    livrosContainer.innerHTML = ''; // Limpar o container
    livros.forEach(livro => {
        const livroElement = document.createElement('div');
        livroElement.className = 'livro';
        livroElement.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>${livro.descricao}</p>
            <div class="livro-buttons">
                <button class="comprarBtn">Comprar</button>
                <button class="detalhesBtn">Detalhes</button>
            </div>
        `;
        livrosContainer.appendChild(livroElement);
    });
    adicionarEventosLivros(); // Adiciona eventos após carregar livros
}

// Adicionar eventos de livro
function adicionarEventosLivros() {
    document.querySelectorAll('.detalhesBtn').forEach(button => {
        button.addEventListener('click', function() {
            const livroTitulo = this.parentElement.parentElement.querySelector('h3').textContent;
            const livroDescricao = this.parentElement.parentElement.querySelector('p').textContent;
            document.getElementById('detalhesTitulo').innerText = livroTitulo;
            document.getElementById('detalhesDescricao').innerText = livroDescricao;
            document.getElementById('detalhesModal').style.display = 'block';
        });
    });

    document.querySelectorAll(".comprarBtn").forEach(button => {
        button.addEventListener("click", function() {
            if (!usuarioLogado) {
                alert("Você precisa estar logado para realizar a compra.");
                document.getElementById("loginModal").style.display = "block";
                return;
            }
            const tituloLivro = this.parentElement.parentElement.querySelector('h3').textContent;
            document.getElementById("livroTitulo").textContent = tituloLivro;
            document.getElementById("compraModal").style.display = "block";
        });
    });
}

// Exibir o modal de login
document.getElementById("loginToggle").addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "block";
});

// Fechar modais
document.querySelectorAll('.close').forEach(elem => {
    elem.onclick = function() {
        this.parentElement.parentElement.style.display = 'none';
    }
});

// Fechar modal ao clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
};

// Login
document.getElementById("modalLoginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const usuario = document.querySelector('input[placeholder="Usuário"]').value;
    const senha = document.querySelector('input[placeholder="Senha"]').value;

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
    
    if (usuarioEncontrado) {
        usuarioLogado = usuarioEncontrado;
        alert("Login realizado com sucesso!");
        document.getElementById("loginModal").style.display = "none";
        document.getElementById("loginToggle").textContent = `Bem-vindo, ${usuarioLogado.nome}`;
        
        // Exibir todos os livros após login
        document.getElementById("livrosTestes").style.display = "none"; // Esconder livros de teste
        document.getElementById("livrosDisponiveis").style.display = "block"; // Mostrar todos os livros
        carregarLivrosDisponiveis(); // Carregar livros disponíveis
    } else {
        alert("Usuário ou senha incorretos.");
    }
});

// Cadastro
document.getElementById("modalCadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.querySelector('input[placeholder="Nome"]').value;
    const usuario = document.querySelector('input[placeholder="Usuário"]').value;
    const email = document.querySelector('input[placeholder="E-mail"]').value;
    const senha = document.querySelector('input[placeholder="Senha"]').value;

    // Validação básica
    if (usuarios.find(u => u.usuario === usuario)) {
        alert("Usuário já existe. Tente outro.");
        return;
    }

    usuarios.push({ nome, usuario, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Salva no armazenamento local
    alert("Cadastro realizado com sucesso! Agora você pode fazer login.");
    document.getElementById("cadastroModal").style.display = "none";
    document.getElementById("loginModal").style.display = "block";
});

// Carregar dados do localStorage ao iniciar
window.onload = function() {
    const usuariosSalvos = localStorage.getItem('usuarios');
    if (usuariosSalvos) {
        usuarios = JSON.parse(usuariosSalvos);
    }
    carregarLivrosTestes(); // Carregar livros de teste ao iniciar
};

// Finalizar compra
document.getElementById("modalCompraForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Compra finalizada com sucesso!");
    document.getElementById("compraModal").style.display = "none";
});

// Trocar para cadastro
document.getElementById("registerBtn").addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("cadastroModal").style.display = "block";
});
