// Navigation
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

// Optional images: + placeholders stay visible until an image loads successfully.
const content = window.portfolioContent;
document.querySelectorAll('[data-image]').forEach(slot => {
  const source = content.images[slot.dataset.image];
  if (!source) return;
  const image = new Image();
  image.alt = slot.dataset.image.replaceAll('-', ' ');
  image.loading = slot.dataset.image.startsWith('hero') ? 'eager' : 'lazy';
  image.addEventListener('load', () => slot.classList.add('has-image'));
  image.addEventListener('error', () => { image.remove(); slot.classList.remove('has-image'); });
  image.src = source;
  slot.append(image);
});

// Portfolio filters
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelectorAll('[data-project]').forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
  });
}));

// Project lightbox
const dialog = document.querySelector('#project-dialog');
let lastProject;
document.querySelectorAll('[data-project]').forEach(project => project.addEventListener('click', () => {
  lastProject = project;
  document.querySelector('#project-title').textContent = project.querySelector('h3').textContent;
  document.querySelector('#project-preview').replaceChildren(project.querySelector('.image-slot').cloneNode(true));
  dialog.showModal();
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#project-contact').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => lastProject?.focus());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});

// Sample review tabs (replace review content before publishing)
document.querySelectorAll('[data-review]').forEach(button => button.addEventListener('click', () => {
  const review = content.reviews[Number(button.dataset.review)];
  document.querySelector('#review-text').textContent = `“${review.quote}”`;
  document.querySelector('#review-name').textContent = review.name;
  document.querySelector('#review-role').textContent = review.role;
  document.querySelectorAll('[data-review]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
}));

// Social links
const socialIcons = {
  Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
  LinkedIn: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M11 17v-7m0 3c0-4 6-4 6 0v4"/><circle cx="7" cy="7" r="1" fill="currentColor" stroke="none"/>',
  Behance: '<path d="M3 6h4a3 3 0 0 1 0 6H3zm0 6h4a3 3 0 0 1 0 6H3zM15 7h5M14 14h7c0-5-7-5-7 0 0 5 6 5 7 2"/>',
  Facebook: '<path d="M14 21v-8h3l.5-4H14V7c0-1.5.5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>',
  YouTube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 6 3-6 3z" fill="currentColor" stroke="none"/>',
  TikTok: '<path d="M14 3v12a4 4 0 1 1-4-4M14 3c0 4 3 5 6 5"/>'
};
document.querySelectorAll('[data-social-links]').forEach(group => content.socials.forEach(social => {
  const link = document.createElement('a');
  link.href = social.url;
  link.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${socialIcons[social.name] || ''}</svg>`;
  link.setAttribute('aria-label', social.name);
  link.title = social.name;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  group.append(link);
}));

// GitHub Pages has no mail server: open an email draft instead of claiming delivery.
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Portfolio enquiry from ${String(data.get('name')).trim()}`;
  const body = `Name: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\n\n${String(data.get('message')).trim()}`;
  window.location.href = `mailto:imabdullahjabir@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'An email draft has been requested. Review and send it in your email app, or contact me on WhatsApp.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
