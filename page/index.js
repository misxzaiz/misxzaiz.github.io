function init() {
  fetch('https://misxzaiz.github.io/page/index.json')
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(function(data) {
    const indexContainer = document.querySelector('#index');
    const contentContainer = document.querySelector('#content');
    let currentIndex = '';
    Object.keys(data.index).forEach(key => {                    
      const indexLink = document.createElement('a');
      indexLink.href = `#${key}`;
      indexLink.innerHTML = key;
      indexContainer.appendChild(indexLink);
    });

    function generateContent(key) {
      contentContainer.innerHTML = '';
      if (Array.isArray(data.index[key])) {
        return;
      }
      Object.entries(data.index[key]).forEach(entry => {
        const [title, [url, description]] = entry;
        const link = document.createElement('a');
        link.className = 'link';
        link.setAttribute('href', url);
        link.innerHTML = title;
        if (description) {
          const desc = document.createElement('span');
          desc.innerHTML = description;
          link.appendChild(desc);
        }
        contentContainer.appendChild(link);
      });
    }

    const links = document.querySelectorAll('#index a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        const key = link.textContent.trim();
        if (key === currentIndex) {
          return;
        }
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        generateContent(key);
        currentIndex = key;
      });
    });

    const firstLink = links[0];
    firstLink.classList.add('active');
    generateContent(firstLink.textContent.trim());
    currentIndex = firstLink.textContent.trim();
  })
  .catch(function(error) {
    console.log('There was a problem with the fetch operation:', error.message);
  });
}
