console.log("Hello, world! This is a link page.");

const storageKey = 'linkData';

document.addEventListener('alpine:init', () => {
  Alpine.data('linkEx', () => ({
    links: [],
    newLink: {},
    now: new Date(),

    init: function() {
      const links = localStorage.getItem(storageKey);
      if (links) {
        this.links = JSON.parse(links);
      }
      setInterval(() => {
        this.now = new Date();
      }, 1000);
    },

    handleUpdate(id) {
      return () => {
        const link = this.links.find(l => l.id === id);
        console.log("Updating link:", link);
        this.links = this.links.map(l => {
          if (l.id === link.id) {
            return {
              ...l,
              updated_at: new Date().toISOString(),
            };
          }
          return l;
        });
        localStorage.setItem(storageKey, JSON.stringify(this.links));
      }
    },

    handleDelete(id) {
      return () => {
        const link = this.links.find(l => l.id === id);
        if (!confirm("Are you sure you want to delete this link?")) {
          return;
        }
        console.log("Deleting link:", link);
        this.links = this.links.filter(l => l.id !== link.id);
        localStorage.setItem(storageKey, JSON.stringify(this.links));
      }
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      const now = this.now;
      const diff = now - date;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) {
        return `${days}日前`;
      }
      if (hours > 0) {
        return `${hours}時間前`;
      }
      if (minutes > 0) {
        return `${minutes}分前`;
      }
      return `最近更新`;
    },

    handleAdd() {
      if (!this.newLink.url || !this.newLink.name) {
        alert("Please enter both URL and Name.");
        return;
      }

      const newLink = {
        id: Date.now(),
        url: this.newLink.url || '',
        name: this.newLink.name || '',
        updated_at: new Date().toISOString(),
      };
      this.links.push(newLink);
      localStorage.setItem(storageKey, JSON.stringify(this.links));
      this.newLink = {};
    },
  }));

});
