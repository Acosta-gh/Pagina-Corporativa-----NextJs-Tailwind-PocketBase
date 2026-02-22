import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

export default pb;

// ── Contacts ──────────────────────────────────────────────
export async function createContact({ name, email, phone, message }) {
  return pb.collection('contacts').create({ name, email, phone, message });
}

// ── Blog posts ────────────────────────────────────────────
export async function getPosts({ page = 1, perPage = 9 } = {}) {
  return pb.collection('posts').getList(page, perPage, {
    sort: '-created',
    filter: 'published = true',
  });
}

export async function getPost(slug) {
  return pb.collection('posts').getFirstListItem(`slug = "${slug}"`);
}

// ── Services ──────────────────────────────────────────────
export async function getServices() {
  return pb.collection('services').getFullList({ sort: 'order' });
}

// ── Team ──────────────────────────────────────────────
export async function getTeam() {
  return pb.collection('team').getFullList({ sort: 'created' });
}