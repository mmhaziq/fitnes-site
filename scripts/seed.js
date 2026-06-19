const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@fitnesssite.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Admin
  const AdminSchema = new mongoose.Schema({ name: String, email: String, password: String });
  const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!existing) {
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await Admin.create({ name: 'Admin', email: ADMIN_EMAIL, password: hashed });
    console.log(`✅ Admin created: ${ADMIN_EMAIL}`);
  } else {
    console.log('ℹ️  Admin already exists');
  }

  // Default Bio
  const BioSchema = new mongoose.Schema({
    name: String, title: String, tagline: String, about: String,
    profileImage: String, heroImage: String, location: String,
    phone: String, email: String, instagram: String, facebook: String, whatsapp: String,
    certifications: Array, stats: Array,
  }, { timestamps: true });
  const Bio = mongoose.models.Bio || mongoose.model('Bio', BioSchema);
  const existingBio = await Bio.findOne();
  if (!existingBio) {
    await Bio.create({
      name: 'Alex Malik',
      title: 'Certified Personal Trainer & Nutritionist',
      tagline: 'Transform your body. Elevate your life.',
      about: 'With over 8 years of experience in personal training and nutrition coaching, I help individuals in Karachi achieve their fitness goals through science-backed programs and personalised attention. Whether you are starting from scratch or looking to level up, I am here to guide every step.',
      location: 'Karachi, Pakistan',
      phone: '+92 300 0000000',
      email: 'alex@fitnesssite.com',
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      whatsapp: 'https://wa.me/923000000000',
      certifications: [
        { title: 'Certified Personal Trainer (CPT)', issuer: 'NASM', year: '2016' },
        { title: 'Precision Nutrition Coach', issuer: 'Precision Nutrition', year: '2018' },
        { title: 'Strength & Conditioning Specialist', issuer: 'NSCA', year: '2020' },
      ],
      stats: [
        { label: 'Clients Trained', value: '500+' },
        { label: 'Years Experience', value: '8+' },
        { label: 'Programs Designed', value: '120+' },
        { label: 'Certifications', value: '3' },
      ],
    });
    console.log('✅ Default bio created');
  } else {
    console.log('ℹ️  Bio already exists');
  }

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(console.error);
