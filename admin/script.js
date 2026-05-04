// ============================================
// BASE DE DADOS - BARBEARIAS E SALÕES DA REGIÃO METROPOLITANA DE POA
// ============================================
let leads = JSON.parse(localStorage.getItem('beautybot_leads')) || [

    // ===================== PORTO ALEGRE =====================
    { id: 1,  name: 'Velho Tranquilo Barbearia', city: 'Porto Alegre', neighborhood: 'Moinhos de Vento', status: 'lead', whatsapp: '5135082205' },
    { id: 2,  name: 'Velho Tranquilo (Três Figueiras)', city: 'Porto Alegre', neighborhood: 'Três Figueiras', status: 'lead', whatsapp: '5132766150' },
    { id: 3,  name: 'La Mafia Barbearia', city: 'Porto Alegre', neighborhood: 'Petrópolis', status: 'lead', whatsapp: '5137378171' },
    { id: 4,  name: 'La Mafia Barbearia', city: 'Porto Alegre', neighborhood: 'Cristal', status: 'lead', whatsapp: '5130284889' },
    { id: 5,  name: 'La Mafia Barbearia', city: 'Porto Alegre', neighborhood: 'Centro Histórico', status: 'lead', whatsapp: '5130720154' },
    { id: 6,  name: 'La Mafia Barbearia', city: 'Porto Alegre', neighborhood: 'Cidade Baixa', status: 'lead', whatsapp: '5133779761' },
    { id: 7,  name: 'La Mafia Barbearia', city: 'Porto Alegre', neighborhood: 'Bom Fim', status: 'lead', whatsapp: '5132731105' },
    { id: 8,  name: 'Veterano Barbearia', city: 'Porto Alegre', neighborhood: 'Cidade Baixa', status: 'lead', whatsapp: '5130626303' },
    { id: 9,  name: 'Barbearia Lacorte', city: 'Porto Alegre', neighborhood: 'Auxiliadora', status: 'lead', whatsapp: '51982216777' },
    { id: 10, name: 'Barbearia Souza', city: 'Porto Alegre', neighborhood: 'Cavalhada', status: 'lead', whatsapp: '5132471316' },
    { id: 11, name: 'Cabelo Curto (Bom Fim)', city: 'Porto Alegre', neighborhood: 'Bom Fim', status: 'lead', whatsapp: '51999999999' },
    { id: 12, name: 'Barbosa Cabeleireiros', city: 'Porto Alegre', neighborhood: 'São Geraldo', status: 'lead', whatsapp: '5132220373' },
    { id: 13, name: 'Amilton Cabeleireiros', city: 'Porto Alegre', neighborhood: 'Cidade Baixa', status: 'lead', whatsapp: '5132214889' },
    { id: 14, name: 'Barbeiro de Sevilha', city: 'Porto Alegre', neighborhood: 'Cristal', status: 'lead', whatsapp: '5132579707' },
    { id: 15, name: 'Barbearia Carrara', city: 'Porto Alegre', neighborhood: 'Menino Deus', status: 'lead', whatsapp: '51999999999' },
    { id: 16, name: 'Farsi La Barba', city: 'Porto Alegre', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },
    { id: 17, name: 'Barbearia Art of Life', city: 'Porto Alegre', neighborhood: 'Protásio Alves', status: 'lead', whatsapp: '51999999999' },
    { id: 18, name: 'Thompson and Hill Barbershop', city: 'Porto Alegre', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },

    // SALÕES POA - ZONA NORTE
    { id: 19, name: 'Espaço Platinum', city: 'Porto Alegre', neighborhood: 'Rubem Berta', status: 'lead', whatsapp: '51989320848' },
    { id: 20, name: 'Estética Estrela', city: 'Porto Alegre', neighborhood: 'Rubem Berta', status: 'lead', whatsapp: '51985888493' },
    { id: 21, name: 'Salão da Bel (CenterLar)', city: 'Porto Alegre', neighborhood: 'Sarandi', status: 'lead', whatsapp: '51996895169' },
    { id: 22, name: 'Salão Margha Mendes', city: 'Porto Alegre', neighborhood: 'Sarandi', status: 'lead', whatsapp: '51991550198' },
    { id: 23, name: 'Cia da Beleza', city: 'Porto Alegre', neighborhood: 'Sarandi', status: 'lead', whatsapp: '5133659603' },
    { id: 24, name: 'Estética Aline Beauty', city: 'Porto Alegre', neighborhood: 'Sarandi', status: 'lead', whatsapp: '5130442111' },
    { id: 25, name: 'Salão Eco Beauty', city: 'Porto Alegre', neighborhood: 'Sarandi', status: 'lead', whatsapp: '5133442272' },

    // ===================== CANOAS =====================
    { id: 26, name: 'La Mafia Barbearia', city: 'Canoas', neighborhood: 'Centro', status: 'lead', whatsapp: '51995800777' },
    { id: 27, name: 'La Mafia Barbearia', city: 'Canoas', neighborhood: 'Moinhos de Vento', status: 'lead', whatsapp: '51997110777' },
    { id: 28, name: 'Mattos Barbearia', city: 'Canoas', neighborhood: 'Niterói', status: 'lead', whatsapp: '51993149567' },
    { id: 29, name: 'Le Classique Barber & Club', city: 'Canoas', neighborhood: 'Marechal Rondon', status: 'lead', whatsapp: '51999999999' },
    { id: 30, name: 'Barbearia Leo Barber', city: 'Canoas', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },
    { id: 31, name: 'Barbearia Tex 66', city: 'Canoas', neighborhood: 'Mathias Velho', status: 'lead', whatsapp: '51989308684' },

    // ===================== GRAVATAÍ =====================
    { id: 32, name: 'La Mafia Barbearia', city: 'Gravataí', neighborhood: 'Centro', status: 'lead', whatsapp: '5131283347' },
    { id: 33, name: 'Barbearia Home 83', city: 'Gravataí', neighborhood: 'Centro', status: 'lead', whatsapp: '51982868020' },
    { id: 34, name: 'Barbearia Edimilson', city: 'Gravataí', neighborhood: 'Salgado Filho', status: 'lead', whatsapp: '51991718691' },
    { id: 35, name: 'Alex Tavares Barbearia', city: 'Gravataí', neighborhood: 'Vera Cruz', status: 'lead', whatsapp: '51998658887' },
    { id: 36, name: 'Barba D\'oro Barbearia', city: 'Gravataí', neighborhood: 'Vera Cruz', status: 'lead', whatsapp: '51985859686' },
    { id: 37, name: 'Barbados Barbershop', city: 'Gravataí', neighborhood: 'São Jerônimo', status: 'lead', whatsapp: '51991429568' },
    { id: 38, name: 'Pedro Barber Studio', city: 'Gravataí', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },

    // ===================== NOVO HAMBURGO =====================
    { id: 39, name: 'OITO Barbearia (Primavera)', city: 'Novo Hamburgo', neighborhood: 'Primavera', status: 'lead', whatsapp: '51993380247' },
    { id: 40, name: 'OITO Barbearia (H. Velho)', city: 'Novo Hamburgo', neighborhood: 'Hamburgo Velho', status: 'lead', whatsapp: '51990149080' },
    { id: 41, name: 'La Mafia Barbearia', city: 'Novo Hamburgo', neighborhood: 'Centro', status: 'lead', whatsapp: '5132799540' },
    { id: 42, name: 'João Barber', city: 'Novo Hamburgo', neighborhood: 'Pátria Nova', status: 'lead', whatsapp: '51996963921' },
    { id: 43, name: 'D\' Castro Barbearia', city: 'Novo Hamburgo', neighborhood: 'São José', status: 'lead', whatsapp: '51997484024' },
    { id: 44, name: 'Oficina do Bigode', city: 'Novo Hamburgo', neighborhood: 'Operário', status: 'lead', whatsapp: '51996945871' },
    { id: 45, name: 'Complex Barbearia', city: 'Novo Hamburgo', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },
    { id: 46, name: 'Barbearia Cadillac', city: 'Novo Hamburgo', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },
    { id: 47, name: 'Los Pepes Barbearia', city: 'Novo Hamburgo', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },

    // ===================== SÃO LEOPOLDO =====================
    { id: 48, name: 'La Mafia Barbearia', city: 'São Leopoldo', neighborhood: 'Centro', status: 'lead', whatsapp: '5137833393' },
    { id: 49, name: 'Hair Box Barber', city: 'São Leopoldo', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },
    { id: 50, name: 'Barbearia Kairos', city: 'São Leopoldo', neighborhood: 'Scharlau', status: 'lead', whatsapp: '51999999999' },

    // ===================== CACHOEIRINHA =====================
    { id: 51, name: 'Barbearia Premium', city: 'Cachoeirinha', neighborhood: 'Centro', status: 'lead', whatsapp: '51991093322' },
    { id: 52, name: 'Mas Que Barba! Barbearia', city: 'Cachoeirinha', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },
    { id: 53, name: 'Club 23 Barber', city: 'Cachoeirinha', neighborhood: 'Vila Eunice Nova', status: 'lead', whatsapp: '51999999999' },
    { id: 54, name: 'Barbearia Champions', city: 'Cachoeirinha', neighborhood: 'Vila Imbui', status: 'lead', whatsapp: '51999999999' },
    { id: 55, name: 'Barbearia Robson Rios', city: 'Cachoeirinha', neighborhood: 'Parque Mal. Rondon', status: 'lead', whatsapp: '51982849594' },

    // ===================== VIAMÃO =====================
    { id: 56, name: 'Barbearia Marujo', city: 'Viamão', neighborhood: 'Centro', status: 'lead', whatsapp: '51999999999' },
    { id: 57, name: 'Barba Barbearia', city: 'Viamão', neighborhood: 'Centro', status: 'lead', whatsapp: '51991475804' },
    { id: 58, name: 'Cabral Barbearia', city: 'Viamão', neighborhood: 'Centro', status: 'lead', whatsapp: '51991961171' },
    { id: 59, name: 'Haus Barber Co.', city: 'Viamão', neighborhood: 'Centro', status: 'lead', whatsapp: '51985151519' },

    // ===================== ALVORADA =====================
    { id: 60, name: 'Casino\'s Club Barbearia', city: 'Alvorada', neighborhood: 'Aparecida', status: 'lead', whatsapp: '51999999999' },
    { id: 61, name: 'Luciano Barber Club', city: 'Alvorada', neighborhood: 'Passo do Feijó', status: 'lead', whatsapp: '51999999999' },
];

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
// INITIAL RENDER
// ============================================
renderLeads();
