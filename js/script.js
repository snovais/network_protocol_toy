// ========================================
// PROTOCOLOS HTTP - VERSÃO SUPER SIMPLES
// ========================================

// ENDEREÇO DA API (servidor fake para testes)
const API = 'https://jsonplaceholder.typicode.com/posts';

// PEGAR elementos da tela
const btnPost = document.getElementById('btnPost');
const btnGet = document.getElementById('btnGet');
const btnLimpar = document.getElementById('btnLimpar');
const logDiv = document.getElementById('log');

// FUNÇÃO para mostrar mensagens no log
function mostrarLog(texto, tipo = 'normal') {
    const div = document.createElement('div');
    div.className = tipo === 'erro' ? 'log-item log-erro' : 'log-item';
    div.innerHTML = `[${new Date().toLocaleTimeString()}] ${texto}`;
    logDiv.appendChild(div);
    div.scrollIntoView();
}

// ========================================
// 1. MÉTODO POST - Enviar dados
// ========================================
async function enviarPost() {
    // PEGAR os dados do formulário
    const titulo = document.getElementById('titulo').value;
    const conteudo = document.getElementById('conteudo').value;
    
    if (!titulo || !conteudo) {
        mostrarLog('⚠️ Preencha título e conteúdo!', 'erro');
        return;
    }
    
    // MONTAR a requisição
    const dados = {
        title: titulo,
        body: conteudo,
        userId: 1
    };
    
    mostrarLog(`📤 ENVIANDO REQUISIÇÃO POST para: ${API}`);
    mostrarLog(`📦 Dados enviados: ${JSON.stringify(dados)}`);
    
    try {
        // FAZER a requisição (a mágica acontece aqui!)
        const resposta = await fetch(API, {
            method: 'POST',           // Método HTTP
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        
        // VER o que o servidor respondeu
        mostrarLog(`📥 RESPOSTA RECEBIDA - Status: ${resposta.status} ${resposta.statusText}`);
        
        if (resposta.ok) {
            const dadosResposta = await resposta.json();
            mostrarLog(`✅ Sucesso! Servidor respondeu: ${JSON.stringify(dadosResposta)}`);
        } else {
            mostrarLog(`❌ Erro ${resposta.status}`, 'erro');
        }
    } catch (erro) {
        mostrarLog(`❌ ERRO DE REDE: ${erro.message}`, 'erro');
    }
}

// ========================================
// 2. MÉTODO GET - Buscar dados
// ========================================
async function buscarPosts() {
    mostrarLog(`📤 ENVIANDO REQUISIÇÃO GET para: ${API}?_limit=2`);
    
    try {
        const resposta = await fetch(`${API}?_limit=2`);
        
        mostrarLog(`📥 RESPOSTA RECEBIDA - Status: ${resposta.status} ${resposta.statusText}`);
        
        if (resposta.ok) {
            const dados = await resposta.json();
            mostrarLog(`✅ Recebidos ${dados.length} posts do servidor`);
            mostrarLog(`📦 Primeiro post: ${dados[0].title}`);
        } else {
            mostrarLog(`❌ Erro ${resposta.status}`, 'erro');
        }
    } catch (erro) {
        mostrarLog(`❌ ERRO: ${erro.message}`, 'erro');
    }
}

// ========================================
// 3. LIMPAR LOG
// ========================================
function limparLog() {
    logDiv.innerHTML = '';
    mostrarLog('🗑️ Log limpo!');
}

// ========================================
// 4. CONECTAR OS BOTÕES
// ========================================
btnPost.onclick = enviarPost;
btnGet.onclick = buscarPosts;
btnLimpar.onclick = limparLog;

// MENSAGEM INICIAL
mostrarLog('🚀 Sistema pronto! Clique em ENVIAR ou BUSCAR');
mostrarLog('💡 Abra o F12 > Network para ver as requisições em tempo real!');