// ============================================
// BASE DE DADOS - CARREGA DO SERVIDOR + LOCALSTORAGE
// ============================================
let leads = [];
let dataLoaded = false;

async function loadLeads() {
    // Se ja tem dados salvos localmente (usuario ja usou o painel), usa esses
    const saved = localStorage.getItem('beautybot_leads');
    if (saved) {
        leads = JSON.parse(saved);
        dataLoaded = true;
        renderLeads();
        return;
    }

    // Senao, carrega o JSON do servidor (749 leads extraidos do Google Maps)
    try {
        const response = await fetch('../leads_com_telefone.json');
        const data = await response.json();
        leads = data.map((item, index) => ({
            id: index + 1,
            name: item.name,
            city: item.city || 'Desconhecida',
            neighborhood: item.neighborhood || item.city || '-',
            whatsapp: item.whatsapp || 'sem_numero',
            status: 'lead'
        }));
        localStorage.setItem('beautybot_leads', JSON.stringify(leads));
        dataLoaded = true;
        renderLeads();
        console.log(`${leads.length} leads carregados do servidor!`);
    } catch (err) {
        console.error('Erro ao carregar leads:', err);
        leads = [];
        renderLeads();
    }
}

// ============================================
// ELEMENTS
// ============================================
const leadsBody = document.getElementById('leads-body');
const leadForm = document.getElementById('lead-form');
const addLeadBtn = document.getElementById('add-lead-btn');
const importBtn = document.getElementById('import-btn');
const importInput = document.getElementById('import-input');
const modal = document.getElementById('lead-modal');
const closeModal = document.querySelector('.close-modal');
const searchInput = document.getElementById('search-input');
const cityFilter = document.getElementById('city-filter');
const resetBtn = document.getElementById('reset-btn');

// ============================================
// RESET LOGIC - Limpa cache e recarrega do servidor
// ============================================
if (resetBtn) {
    resetBtn.onclick = () => {
        if (confirm('Isso vai recarregar todos os leads do servidor. Suas alteracoes de status serao perdidas. Continuar?')) {
            localStorage.removeItem('beautybot_leads');
            location.reload();
        }
    };
}

// ============================================
// IMPORT LOGIC
// ============================================
importBtn.onclick = () => importInput.click();

importInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedLeads = JSON.parse(event.target.result);
            const startId = Date.now();
            const formattedLeads = importedLeads.map((l, index) => ({
                id: startId + index,
                name: l.name,
                city: l.city || 'Desconhecida',
                neighborhood: l.neighborhood,
                whatsapp: l.whatsapp.replace(/\D/g, ''),
                status: 'lead'
            }));
            leads = [...leads, ...formattedLeads];
            localStorage.setItem('beautybot_leads', JSON.stringify(leads));
            renderLeads();
            alert(`${formattedLeads.length} leads importados com sucesso!`);
        } catch (err) {
            alert('Erro ao ler o arquivo JSON. Verifique o formato.');
        }
    };
    reader.readAsText(file);
};

// ============================================
// RENDER TABLE
// ============================================
function renderLeads(data = leads) {
    leadsBody.innerHTML = '';

    data.forEach(lead => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${lead.name}</strong></td>
            <td>${lead.city || '-'}</td>
            <td>${lead.neighborhood}</td>
            <td>
                <span class="status-badge status-${lead.status}" onclick="cycleStatus(${lead.id})" style="cursor:pointer;" title="Clique para mudar o status">
                    ${getStatusText(lead.status)}
                </span>
            </td>
            <td>
                <a href="https://wa.me/55${lead.whatsapp}" target="_blank" class="wa-link">
                    <i class="fab fa-whatsapp"></i> ${formatWhatsApp(lead.whatsapp)}
                </a>
            </td>
            <td>
                <button onclick="deleteLead(${lead.id})" style="background:none; border:none; color:#ef4444; cursor:pointer;" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        leadsBody.appendChild(tr);
    });

    updateStats();
}

function getStatusText(status) {
    const texts = { lead: '🔵 Novo', contacted: '🟡 Contatado', customer: '🟢 Cliente', rejected: '🔴 Recusou' };
    return texts[status] || status;
}

function formatWhatsApp(num) {
    if (num.length === 11) return num.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (num.length === 10) return num.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    return num;
}

function updateStats() {
    document.getElementById('total-leads').innerText = leads.length;
    document.getElementById('contacted-leads').innerText = leads.filter(l => l.status === 'contacted').length;
    document.getElementById('active-customers').innerText = leads.filter(l => l.status === 'customer').length;
}

// ============================================
// CYCLE STATUS (click to change)
// ============================================
window.cycleStatus = (id) => {
    const order = ['lead', 'contacted', 'customer', 'rejected'];
    const lead = leads.find(l => l.id === id);
    if (!lead) return;
    const currentIndex = order.indexOf(lead.status);
    lead.status = order[(currentIndex + 1) % order.length];
    localStorage.setItem('beautybot_leads', JSON.stringify(leads));
    applyFilters();
};

// ============================================
// MODAL LOGIC
// ============================================
addLeadBtn.onclick = () => modal.style.display = 'block';
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

// ============================================
// FORM SUBMISSION
// ============================================
leadForm.onsubmit = (e) => {
    e.preventDefault();
    const newLead = {
        id: Date.now(),
        name: document.getElementById('name').value,
        city: document.getElementById('city') ? document.getElementById('city').value : 'Porto Alegre',
        neighborhood: document.getElementById('neighborhood').value,
        whatsapp: document.getElementById('whatsapp').value.replace(/\D/g, ''),
        status: document.getElementById('status').value
    };
    leads.push(newLead);
    localStorage.setItem('beautybot_leads', JSON.stringify(leads));
    renderLeads();
    modal.style.display = 'none';
    leadForm.reset();
};

// ============================================
// DELETE LEAD
// ============================================
window.deleteLead = (id) => {
    if (confirm('Deseja excluir este lead?')) {
        leads = leads.filter(l => l.id !== id);
        localStorage.setItem('beautybot_leads', JSON.stringify(leads));
        applyFilters();
    }
};

// ============================================
// FILTER LOGIC (Search + City)
// ============================================
function applyFilters() {
    const searchVal = searchInput.value.toLowerCase();
    const cityVal = cityFilter ? cityFilter.value : 'all';

    let filtered = leads;

    if (cityVal !== 'all') {
        filtered = filtered.filter(l => l.city === cityVal);
    }

    if (searchVal) {
        filtered = filtered.filter(l =>
            l.name.toLowerCase().includes(searchVal) ||
            l.neighborhood.toLowerCase().includes(searchVal)
        );
    }

    renderLeads(filtered);
}

searchInput.oninput = applyFilters;
if (cityFilter) cityFilter.onchange = applyFilters;

// ============================================
// INITIAL LOAD
// ============================================
loadLeads();
