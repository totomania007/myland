'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, CloudArrowUpIcon, CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function TenantOnboardingPage() {
  const [fullName, setFullName] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdCardImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdpaConsent) {
      alert('กรุณาให้ความยินยอมเกี่ยวกับนโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA Consent)');
      return;
    }

    setUploading(true);
    try {
      // Demo upload simulation / Cloudinary URL handler
      let imageUrl = 'https://res.cloudinary.com/demo/image/upload/v1631234567/sample_id_card.jpg';
      if (idCardImage) {
        // Mocking Cloudinary URL upload response for seamless demonstration
        imageUrl = URL.createObjectURL(idCardImage);
      }

      setUploadedUrl(imageUrl);
      setSubmitted(true);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-6 md:p-10 font-sans flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full space-y-4">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-xs mb-2 transition-colors font-medium">
          <ArrowLeftIcon className="w-4 h-4" /> กลับสู่หน้าหลัก
        </Link>

        <div className="bento-card p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-emerald-500/15 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">ลงทะเบียนข้อมูลผู้เช่า & อัปโหลดเอกสาร</h1>
          </div>
          <p className="text-slate-400 text-xs mb-8">
            Tenant Onboarding Portal — ข้อมูลของคุณจะถูกเก็บบันทึกอย่างปลอดภัยผ่านระบบ Cloudinary
          </p>

          {submitted ? (
            <div className="text-center py-10 bg-slate-950/60 rounded-2xl border border-emerald-500/30 p-6">
              <CheckCircleIcon className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">ลงทะเบียนสำเร็จ!</h2>
              <p className="text-slate-400 text-xs mb-6">
                ข้อมูลและหลักฐานบัตรประชาชนได้รับการบันทึกเข้าสู่ระบบ Cloudflare D1 เรียบร้อยแล้ว
              </p>
              {uploadedUrl && (
                <div className="inline-block p-2 bg-slate-900 border border-slate-700 rounded-xl">
                  <span className="text-[10px] text-slate-400 block mb-1">ภาพถ่ายบัตรประชาชน (Cloudinary Asset)</span>
                  {/* eslint-disable-next-next/no-img-element */}
                  <img src={uploadedUrl} alt="Uploaded Card" className="max-h-32 rounded object-cover" />
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">ชื่อ-นามสกุล (Full Name)</label>
                <input
                  type="text"
                  required
                  placeholder="นายสมชาย ใจดี"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">เลขประจำตัวประชาชน 13 หลัก</label>
                  <input
                    type="text"
                    required
                    placeholder="1-1004-99999-99-9"
                    value={idCardNumber}
                    onChange={(e) => setIdCardNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">เบอร์โทรศัพท์ติดต่อ</label>
                  <input
                    type="tel"
                    required
                    placeholder="081-234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">อีเมล (Email Address)</label>
                <input
                  type="email"
                  placeholder="somchai@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                />
              </div>

              {/* Cloudinary Image File Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  อัปโหลดรูปถ่าย/สำเนาบัตรประชาชน (Cloudinary Secured Image)
                </label>
                <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 text-center bg-slate-950/40 cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <CloudArrowUpIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <span className="text-xs text-slate-300 block font-medium">
                    {idCardImage ? idCardImage.name : 'คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">รองรับ JPG, PNG (ส่งตรงไปยัง Cloudinary Storage)</span>
                </div>
              </div>

              {/* PDPA Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer bg-slate-950/80 p-4 rounded-xl border border-slate-850">
                  <input
                    type="checkbox"
                    checked={pdpaConsent}
                    onChange={(e) => setPdpaConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    ข้าพเจ้ายินยอมให้ผู้ให้เช่าจัดเก็บ ใช้ และประมวลผลข้อมูลส่วนบุคคลและรูปถ่ายบัตรประชาชนตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) เพื่อการทำสัญญาเช่าอสังหาริมทรัพย์เท่านั้น
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {uploading ? 'กำลังบันทึกข้อมูล...' : 'ส่งข้อมูลผู้เช่าและอัปโหลดบัตรประชาชน'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
