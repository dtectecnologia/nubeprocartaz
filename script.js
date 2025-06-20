const usuarios = [
  { usuario: "admin", senha: "1234" },
  { usuario: "cliente1", senha: "1234" }
];

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const valido = usuarios.find(u => u.usuario === user && u.senha === pass);
  if (valido) {
    localStorage.setItem("usuarioLogado", user);
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");
    mostrarProdutos();
  } else {
    document.getElementById("error").classList.remove("hidden");
  }
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  location.reload();
}

window.onload = () => {
  const user = localStorage.getItem("usuarioLogado");
  if (user) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");
    mostrarProdutos();
  } else {
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("dashboard-section").classList.add("hidden");
  }
}

const usuarios = [
  { usuario: "admin", senha: "1234" },
  { usuario: "cliente1", senha: "1234" }
];

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const valido = usuarios.find(u => u.usuario === user && u.senha === pass);
  if (valido) {
    localStorage.setItem("usuarioLogado", user);
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");
    mostrarProdutos();
  } else {
    document.getElementById("error").classList.remove("hidden");
  }
}

function getUser() {
  return localStorage.getItem("usuarioLogado") || "";
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  location.reload();
}

window.onload = function () {
  const logado = getUser();
  if (logado) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");
    mostrarProdutos();
  }
};

function mostrarProdutos() {
  const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";
  produtos.forEach((p, index) => {
    lista.innerHTML += `
      <tr class="border-t">
        <td class="p-2"><input type="text" value="${p.nome}" onchange="atualizarCampo(${index}, 'nome', this.value)" class="border p-1 w-full"/></td>
        <td class="p-2"><input type="number" value="${p.preco}" onchange="atualizarCampo(${index}, 'preco', this.value)" class="border p-1 w-full"/></td>
        <td class="p-2"><input type="text" value="${p.ean}" onchange="atualizarCampo(${index}, 'ean', this.value)" class="border p-1 w-full"/></td>
        <td class="p-2">${p.modelo}</td>
        <td class="p-2"><button onclick="preVisualizar(${index})" class="bg-purple-500 text-white px-2 py-1 rounded">Prévia</button></td>
        <td class="p-2"><button onclick="gerarCartaz(${index})" class="bg-blue-500 text-white px-2 py-1 rounded">PDF</button></td>
        <td class="p-2"><button onclick="editarProduto(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button></td>
        <td class="p-2"><button onclick="excluirProduto(${index})" class="bg-red-500 text-white px-2 py-1 rounded">X</button></td>
      </tr>
    `;
  });
}


function atualizarCampo(index, campo, valor) {
  const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
  produtos[index][campo] = valor;
  localStorage.setItem("produtos_" + getUser(), JSON.stringify(produtos));
  mostrarProdutos();
}

function editarProduto(index) {
  const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
  const p = produtos[index];
  document.getElementById("nome").value = p.nome;
  document.getElementById("preco").value = p.preco;
  document.getElementById("ean").value = p.ean;
  document.getElementById("modelo").value = p.modelo;
  produtos.splice(index, 1);
  localStorage.setItem("produtos_" + getUser(), JSON.stringify(produtos));
  mostrarProdutos();
}

function excluirProduto(index) {
  const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    produtos.splice(index, 1);
    localStorage.setItem("produtos_" + getUser(), JSON.stringify(produtos));
    mostrarProdutos();
  }
}

function salvarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const ean = document.getElementById("ean").value;
  const modelo = document.getElementById("modelo").value;
  const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
  produtos.push({ nome, preco, ean, modelo });
  localStorage.setItem("produtos_" + getUser(), JSON.stringify(produtos));
  document.getElementById("form-produto").reset();
  mostrarProdutos();
}

function filtrarProdutos() {
  const termo = document.getElementById("filtro").value.toLowerCase();
  const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";
  produtos.forEach((p, index) => {
    if (p.nome.toLowerCase().includes(termo)) {
      lista.innerHTML += `
        <tr class="border-t">
          <td class="p-2"><input type="text" value="${p.nome}" onchange="atualizarCampo(${index}, 'nome', this.value)" class="border p-1 w-full"/></td>
          <td class="p-2"><input type="number" step="0.01" value="${p.preco}" onchange="atualizarCampo(${index}, 'preco', this.value)" class="border p-1 w-full"/></td>
          <td class="p-2"><input type="text" value="${p.ean}" onchange="atualizarCampo(${index}, 'ean', this.value)" class="border p-1 w-full"/></td>
          <td class="p-2">${p.modelo}</td>
          <td class="p-2"><button onclick="preVisualizar(${index})" class="bg-purple-500 text-white px-2 py-1 rounded">Prévia</button></td>
          <td class="p-2"><button onclick="gerarCartaz(${index})" class="bg-blue-500 text-white px-2 py-1 rounded">PDF</button></td>
          <td class="p-2"><button onclick="editarProduto(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button></td>
          <td class="p-2"><button onclick="excluirProduto(${index})" class="bg-red-500 text-white px-2 py-1 rounded">X</button></td>
        </tr>`;
    }
  });
}

function exportarProdutos() {
  const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
  let csv = "Produto,Preço,EAN,Modelo\n";
  produtos.forEach(p => {
    csv += `"${p.nome}","${p.preco}","${p.ean}","${p.modelo}"\n`;
  });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "produtos.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// As funções de geração de cartaz são reutilizadas e assumem que o fundo e canvas já existem no HTML


function salvarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const precoDe = document.getElementById("de").value || null;
  const ean = document.getElementById("ean").value;
  const modelo = document.getElementById("modelo").value;
  const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
  produtos.push({ nome, preco, precoDe, ean, modelo });
  localStorage.setItem("produtos_" + getUser(), JSON.stringify(produtos));
  document.getElementById("form-produto").reset();
  mostrarProdutos();
}

function importarExcel(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  if (file.name.endsWith(".csv")) {
    reader.onload = function (e) {
      const linhas = e.target.result.split("\n").slice(1);
      const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
      linhas.forEach(linha => {
        const [nome, preco, ean, modelo] = linha.split(",");
        if (nome && preco && !produtos.find(p => p.nome === nome.trim())) {
          produtos.push({ nome: nome.trim(), preco: preco.trim(), ean: (ean || "").trim(), modelo: (modelo || "").trim() });
        }
      });
      localStorage.setItem("produtos_" + getUser(), JSON.stringify(produtos));
      mostrarProdutos();
    };
    reader.readAsText(file);
  } else {
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      const produtos = JSON.parse(localStorage.getItem("produtos_" + getUser()) || "[]");
      json.forEach(row => {
        const nome = row["Produto"] || row["produto"] || row["NOME"];
        const preco = row["Preço"] || row["preco"];
        const ean = row["EAN"] || "";
        const modelo = row["Modelo"] || "";
        if (nome && preco && !produtos.find(p => p.nome === nome)) {
          produtos.push({ nome, preco, ean, modelo });
        }
      });
      localStorage.setItem("produtos_" + getUser(), JSON.stringify(produtos));
      mostrarProdutos();
    };
    reader.readAsArrayBuffer(file);
  }
}