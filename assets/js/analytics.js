/*==================== GOOGLE ANALYTICS INITIALIZATION ====================*/
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

document.addEventListener('DOMContentLoaded', () => {
  if (typeof window.ANALYTICS_CONFIG !== 'undefined') {
    gtag('config', window.ANALYTICS_CONFIG.MEASUREMENT_ID, {
      'send_page_view': true,
      'anonymize_ip': true
    });
  } else {
    console.warn('Google Analytics not configured. Please update MEASUREMENT_ID in config.js');
  }
});

/*==================== GOOGLE ANALYTICS EVENT TRACKING ====================*/
function sendGAEvent(eventName, eventParams = {}) {
  if (typeof gtag !== 'undefined' &&
    typeof window.ANALYTICS_CONFIG !== 'undefined') {
    gtag('event', eventName, eventParams);
  }
}

// Track navigation clicks
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      const section = this.getAttribute('href');
      sendGAEvent('navigation_click', {
        'section_name': section.replace('#', ''),
        'link_text': this.textContent.trim()
      });
    });
  });

  // Track contact form submissions
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      sendGAEvent('contact_form_submit', {
        'form_name': 'main_contact_form'
      });
    });
  }

  // Track CV download
  const cvButton = document.querySelector('a[download]');
  if (cvButton) {
    cvButton.addEventListener('click', () => {
      sendGAEvent('cv_download', {
        'file_name': 'Delwar-CV.pdf',
        'button_location': 'about_section'
      });
    });
  }

  // Track social media clicks
  document.querySelectorAll('.home__social-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const href = this.getAttribute('href');
      let platform = 'unknown';

      if (href.includes('facebook')) platform = 'facebook';
      else if (href.includes('linkedin')) platform = 'linkedin';
      else if (href.includes('github')) platform = 'github';

      sendGAEvent('social_media_click', {
        'platform': platform,
        'link_url': href
      });
    });
  });

  // Track project demo clicks
  document.querySelectorAll('.portfolio__button').forEach(button => {
    button.addEventListener('click', () => {
      const projectCard = this.closest('.portfolio__content');
      const projectTitle = projectCard.querySelector('.portfolio__title')?.textContent || 'Unknown Project';

      sendGAEvent('project_demo_click', {
        'project_name': projectTitle,
        'link_url': this.getAttribute('href')
      });
    });
  });

  // Track service modal views
  const modalBtns = document.querySelectorAll('.services__button');
  modalBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const serviceTitle = this.closest('.services__content').querySelector('.services__title')?.textContent || 'Unknown Service';

      sendGAEvent('service_modal_view', {
        'service_name': serviceTitle.replace(/\n/g, ' ').trim(),
        'modal_index': index
      });
    });
  });

  // Track theme changes
  const themeButton = document.getElementById('theme-button');
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const darkTheme = 'dark-theme';
      const newTheme = document.body.classList.contains(darkTheme) ? 'light' : 'dark';

      sendGAEvent('theme_change', {
        'theme_selected': newTheme
      });
    });
  }

  // Track time spent on page (send event after 20 seconds)
  setTimeout(() => {
    sendGAEvent('engagement', {
      'engagement_time_msec': 20000
    });
  }, 20000);
});
