// Initial Data (Simulated)
let leads = JSON.parse(localStorage.getItem('beautybot_leads')) || [
    { id: 1, name: 'Barbearia do Moinhos', neighborhood: 'Moinhos de Vento', status: 'customer', whatsapp: '51991234567' },
    { id: 2, name: 'Corte & Estilo', neighborhood: 'Cidade Baixa', status: 'lead', whatsapp: '51988887777' },
    { id: 3, name: 'Salão da Praça', neighborhood: 'Petrópolis', status: 'contacted', whatsapp: '51977776666' },
    { id: 4, name: 'Barber Shop Canoas', neighborhood: 'Canoas', status: 'lead', whatsapp: '51966665555' }
];

// Elements
const leadsBody = document.getElementById('leads-body');
const leadForm = document.getElementById('lead-form');
const addLeadBtn = document.getElementById('add-lead-btn');
const modal = document.getElementById('lead-modal');
const closeModal = document.querySelector('.close-modal');
const searchInput = document.getElementById('search-input');

// Render Table
function renderLeads(data = leads) {
    leadsBody.innerHTML = '';
    
    data.forEach(lead => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${lead.name}</strong></td>
            <td>${lead.neighborhood}</td>
            <td><span class="status-badge status-${lead.status}">${getStatusText(lead.status)}</span></td>
            <td><a href="https://wa.me/${lead.whatsapp}" target="_blank" class="wa-link"><i class="fab fa-whatsapp"></i> ${formatWhatsApp(lead.whatsapp)}</a></td>
            <td>
                <button onclick="deleteLead(${lead.id})" style="background:none; border:none; color:#ef4444; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </td>
        `;
        leadsBody.appendChild(tr);
    });

    updateStats();
}

function getStatusText(status) {
    const texts = { lead: 'Novo', contacted: 'Em Contato', customer: 'Cliente' };
    return texts[status] || status;
}

function formatWhatsApp(num) {
    return num.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function updateStats() {
    document.getElementById('total-leads').innerText = leads.length;
    document.getElementById('contacted-leads').innerText = leads.filter(l => l.status === 'contacted').length;
    document.getElementById('active-customers').innerText = leads.filter(l => l.status === 'customer').length;
}

// Modal Logic
addLeadBtn.onclick = () => modal.style.display = 'block';
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

// Form Submission
leadForm.onsubmit = (e) => {
    e.preventDefault();
    
    const newLead = {
        id: Date.now(),
        name: document.getElementById('name').value,
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

// Delete Lead
window.deleteLead = (id) => {
    if (confirm('Deseja excluir este lead?')) {
        leads = leads.filter(l => l.id !== id);
        localStorage.setItem('beautybot_leads', JSON.stringify(leads));
        renderLeads();
    }
};

// Search Logic
searchInput.oninput = (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = leads.filter(l => 
        l.name.toLowerCase().includes(val) || 
        l.neighborhood.toLowerCase().includes(val)
    );
    renderLeads(filtered);
};

// Initial Render
renderLeads();
