"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Settings, 
  Plus, 
  Trash2, 
  Upload, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Activity,
  Award,
  CircleDot
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Basic Info", icon: <Settings className="w-5 h-5" /> },
  { id: 2, title: "Location", icon: <MapPin className="w-5 h-5" /> },
  { id: 3, title: "Sports & Amenities", icon: <Activity className="w-5 h-5" /> },
  { id: 4, title: "Courts", icon: <CircleDot className="w-5 h-5" /> },
  { id: 5, title: "Media", icon: <Upload className="w-5 h-5" /> },
];

const AMENITIES_OPTIONS = ["Parking", "Changing Rooms", "Water", "Floodlights", "Cafe", "First Aid", "Equipment Rental", "Showers", "Locker Room"];
const SPORTS_OPTIONS = ["Football", "Cricket", "Tennis", "Badminton", "Basketball", "Volleyball"];

export default function RegisterTurfPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    gstin: "",
    panOwner: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
      mapLink: "",
    },
    location: {
      type: "Point",
      coordinates: [0, 0] as [number, number],
    },
    amenities: [] as string[],
    sports: [] as string[],
    courts: [
      { name: "", pricePerHour: 0, sport: [] as string[], surfaceType: "", description: "" }
    ],
    logo: null as File | null,
    images: [] as File[],
    documents: [] as File[],
    courtImages: {} as Record<number, File[]>,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name || formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
      if (!formData.panOwner || formData.panOwner.length !== 10) newErrors.panOwner = "PAN must be exactly 10 characters";
    } else if (step === 2) {
      if (!formData.address.city) newErrors.city = "City is required";
      if (!formData.address.line1) newErrors.line1 = "Address is required";
    } else if (step === 3) {
      if (formData.sports.length === 0) newErrors.sports = "Select at least one sport";
    } else if (step === 4) {
      formData.courts.forEach((court, i) => {
        if (!court.name) newErrors[`court_${i}_name`] = "Court name is required";
        if (court.pricePerHour <= 0) newErrors[`court_${i}_price`] = "Price must be positive";
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrors(prev => {
      const { [name]: removed, ...rest } = prev;
      return rest;
    });

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, courtIndex?: number, slotIndex?: number) => {
    const files = Array.from(e.target.files || []);
    if (courtIndex !== undefined && slotIndex !== undefined) {
      setFormData(prev => {
        const existing = prev.courtImages[courtIndex] || [];
        const updated = [...existing];
        updated[slotIndex] = files[0];
        return {
          ...prev,
          courtImages: { ...prev.courtImages, [courtIndex]: updated }
        };
      });
    } else if (courtIndex !== undefined) {
      setFormData(prev => ({
        ...prev,
        courtImages: { ...prev.courtImages, [courtIndex]: files }
      }));
    } else if (field === 'logo') {
      setFormData(prev => ({ ...prev, logo: files[0] || null }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [field as 'images' | 'documents']: [...(prev[field as 'images' | 'documents'] as File[]), ...files] 
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    
    setIsSubmitting(true);
    
    // Simulating API call since backend is not yet integrated
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const toggleSelection = (value: string, field: 'amenities' | 'sports') => {
    setErrors(prev => {
      const { [field]: removed, ...rest } = prev;
      return rest;
    });
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleCourtChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrors(prev => {
      const { [`court_${index}_${name}`]: removed, ...rest } = prev;
      return rest;
    });
    const newCourts = [...formData.courts];
    (newCourts[index] as any)[name] = name === 'pricePerHour' ? Number(value) : value;
    setFormData(prev => ({ ...prev, courts: newCourts }));
  };

  const addCourt = () => {
    setFormData(prev => ({
      ...prev,
      courts: [...prev.courts, { name: "", pricePerHour: 0, sport: [], surfaceType: "", description: "" }]
    }));
  };

  const removeCourt = (index: number) => {
    setFormData(prev => ({
      ...prev,
      courts: prev.courts.filter((_, i) => i !== index)
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Turf Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Dream Sports Arena"
                  className={`w-full bg-zinc-900 border-2 border-zinc-800 rounded-none px-4 py-3 font-bold text-white placeholder:font-medium placeholder:text-zinc-700 transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white ${
                    errors.name ? "!border-red-500" : ""
                  }`}
                />
                {errors.name && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your turf..."
                  rows={4}
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-none px-4 py-3 font-bold placeholder:font-medium placeholder:text-zinc-700 transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">GSTIN (Optional)</label>
                  <input
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    placeholder="22AAAAA0000A1Z5"
                    className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-none px-4 py-3 font-bold placeholder:font-medium placeholder:text-zinc-700 transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Owner PAN</label>
                  <input
                    name="panOwner"
                    value={formData.panOwner}
                    onChange={handleInputChange}
                    placeholder="ABCDE1234F"
                    className={`w-full bg-zinc-900 border-2 rounded-none px-4 py-3 font-bold placeholder:font-medium placeholder:text-zinc-700 transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white ${
                      errors.panOwner ? "border-red-500" : "border-zinc-800"
                    }`}
                  />
                  {errors.panOwner && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mt-1">{errors.panOwner}</p>}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">City</label>
                  <input
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Mumbai"
                    className={`w-full bg-zinc-900 border-2 rounded-none px-4 py-3 font-bold placeholder:font-medium placeholder:text-zinc-700 transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white ${
                      errors.city ? "border-red-500" : "border-zinc-800"
                    }`}
                  />
                  {errors.city && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mt-1">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">State</label>
                  <input
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    placeholder="e.g. Maharashtra"
                    className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-none px-4 py-3 font-bold placeholder:font-medium placeholder:text-zinc-700 transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Address Line 1</label>
                <input
                  name="address.line1"
                  value={formData.address.line1}
                  onChange={handleInputChange}
                  className={`w-full bg-zinc-900 border-2 rounded-none px-4 py-3 font-bold transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white ${
                    errors.line1 ? "border-red-500" : "border-zinc-800"
                  }`}
                />
                {errors.line1 && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mt-1">{errors.line1}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Google Maps Link</label>
                <input
                  name="address.mapLink"
                  value={formData.address.mapLink}
                  onChange={handleInputChange}
                  placeholder="https://maps.google.com/..."
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-none px-4 py-3 font-bold placeholder:font-medium placeholder:text-zinc-700 transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Activity className="w-4 h-4 text-lime-500" /> Select Sports
              </h3>
              <div className="flex flex-wrap gap-3">
                {SPORTS_OPTIONS.map(sport => (
                  <button
                    key={sport}
                    onClick={() => toggleSelection(sport, 'sports')}
                    className={`px-5 py-2 border-2 transition-all text-xs font-black uppercase tracking-wider cursor-pointer -skew-x-12 ${
                      formData.sports.includes(sport) 
                        ? "bg-lime-500 text-black border-lime-500 shadow-[4px_4px_0px_#ffffff] hover:bg-lime-400" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800"
                    }`}
                  >
                    <span className="skew-x-12 block">{sport}</span>
                  </button>
                ))}
              </div>
              {errors.sports && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mt-1">{errors.sports}</p>}
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Settings className="w-4 h-4 text-lime-500" /> Amenities
              </h3>
              <div className="flex flex-wrap gap-3">
                {AMENITIES_OPTIONS.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => toggleSelection(amenity, 'amenities')}
                    className={`px-5 py-2 border-2 transition-all text-xs font-black uppercase tracking-wider cursor-pointer -skew-x-12 ${
                      formData.amenities.includes(amenity) 
                        ? "bg-lime-500 text-black border-lime-500 shadow-[4px_4px_0px_#ffffff] hover:bg-lime-400" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800"
                    }`}
                  >
                    <span className="skew-x-12 block">{amenity}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            {formData.courts.map((court, index) => (
              <div key={index} className="bg-black/40 p-6 relative border-2 border-zinc-800 -skew-x-1">
                <div className="skew-x-1">
                  {formData.courts.length > 1 && (
                    <button 
                      onClick={() => removeCourt(index)}
                      className="absolute top-4 right-4 text-red-500 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Court Name</label>
                      <input
                        name="name"
                        value={court.name}
                        onChange={(e) => handleCourtChange(index, e)}
                        placeholder="e.g. Main Pitch"
                        className={`w-full bg-zinc-900 border-2 rounded-none px-4 py-3 font-bold placeholder:font-medium placeholder:text-zinc-700 transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white ${
                          errors[`court_${index}_name`] ? "border-red-500" : "border-zinc-800"
                        }`}
                      />
                      {errors[`court_${index}_name`] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mt-1">{errors[`court_${index}_name`]}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Price per Hour (₹)</label>
                      <input
                        name="pricePerHour"
                        type="number"
                        value={court.pricePerHour}
                        onChange={(e) => handleCourtChange(index, e)}
                        className={`w-full bg-zinc-900 border-2 rounded-none px-4 py-3 font-bold transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white caret-white ${
                          errors[`court_${index}_price`] ? "border-red-500" : "border-zinc-800"
                        }`}
                      />
                      {errors[`court_${index}_price`] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mt-1">{errors[`court_${index}_price`]}</p>}
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Court Images</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[0, 1, 2].map((i) => (
                          <label 
                            key={i} 
                            className="aspect-video border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center bg-zinc-900/50 hover:bg-zinc-800 transition-all cursor-pointer group overflow-hidden relative"
                          >
                            {formData.courtImages[index]?.[i] ? (
                              <div className="absolute inset-0 flex items-center justify-center bg-lime-500/10">
                                <CheckCircle2 className="w-6 h-6 text-lime-500" />
                              </div>
                            ) : (
                              <Plus className="w-5 h-5 text-zinc-700 group-hover:text-lime-500 transition-colors" />
                            )}
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={(e) => handleFileChange(e, 'courtImages', index, i)}
                            />
                          </label>
                        ))}
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-2">
                        {formData.courtImages[index]?.length || 0} images selected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={addCourt}
              className="w-full py-4 border-2 border-dashed border-zinc-800 text-zinc-500 hover:bg-zinc-900 transition-all flex items-center justify-center gap-2 cursor-pointer font-black uppercase tracking-widest text-xs"
            >
              <Plus className="w-5 h-5" /> Add Another Court
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Turf Logo</h3>
                  <label className="aspect-square w-32 border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center bg-zinc-900/50 hover:bg-zinc-900 transition-all cursor-pointer group relative overflow-hidden -skew-x-6">
                    <div className="skew-x-6">
                      {formData.logo ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-lime-500/10">
                          <CheckCircle2 className="w-10 h-10 text-lime-500" />
                        </div>
                      ) : (
                        <Upload className="w-8 h-8 text-zinc-700 group-hover:text-lime-500 transition-colors" />
                      )}
                    </div>
                    <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'logo')} />
                  </label>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{formData.logo ? formData.logo.name : "Recommended: 512x512 PNG/JPG"}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">General Gallery</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {formData.images.map((_, i) => (
                      <div key={i} className="aspect-square bg-lime-500/10 border border-lime-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-lime-500" />
                      </div>
                    ))}
                    <label className="aspect-square border-2 border-dashed border-zinc-800 flex items-center justify-center bg-zinc-900/50 hover:bg-zinc-900 transition-all cursor-pointer">
                      <Plus className="w-6 h-6 text-zinc-700" />
                      <input type="file" multiple className="hidden" onChange={(e) => handleFileChange(e, 'images')} />
                    </label>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{formData.images.length} images selected</p>
                </div>
             </div>
             
             <div className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Verification Documents</h3>
               <label className="w-full h-20 border-2 border-dashed border-zinc-800 flex items-center justify-center gap-3 bg-zinc-900/50 hover:bg-zinc-900 transition-all cursor-pointer -skew-x-2">
                  <span className="skew-x-2 flex items-center gap-3">
                    <Upload className="w-5 h-5 text-zinc-700 group-hover:text-lime-500 transition-colors" />
                    <span className="font-black text-xs uppercase tracking-widest text-zinc-500">Upload ID Proof / Property Documents</span>
                  </span>
                  <input type="file" multiple className="hidden" onChange={(e) => handleFileChange(e, 'documents')} />
               </label>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{formData.documents.length} documents selected</p>
             </div>

             <div className="p-6 bg-lime-500/5 border-2 border-lime-500/20 space-y-3 -skew-x-1">
                <div className="skew-x-1">
                  <h4 className="font-black text-lime-500 flex items-center gap-2 uppercase tracking-widest text-sm">
                    <CheckCircle2 className="w-5 h-5" /> Almost there!
                  </h4>
                  <p className="text-sm text-zinc-400 font-bold leading-relaxed">
                    By clicking complete, you submit your turf for verification. Our team will review your application and get back to you within 48 hours.
                  </p>
                </div>
             </div>
             {errors.submit && <p className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-500/10 p-4 border-2 border-red-500/20">{errors.submit}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <main className="h-screen flex items-center justify-center bg-zinc-950 px-6 overflow-hidden relative">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-lime-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 bg-zinc-900 border-2 border-zinc-800 p-12 text-center max-w-xl -skew-x-2 shadow-[20px_20px_0px_#18181b]">
          <div className="skew-x-2">
            <div className="w-20 h-20 bg-lime-500 rounded-none flex items-center justify-center mx-auto mb-8 -skew-x-12 shadow-[4px_4px_0px_#ffffff]">
              <CheckCircle2 className="w-10 h-10 text-black skew-x-12" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-widest mb-4">Registration Submitted!</h1>
            <p className="text-zinc-400 font-bold leading-relaxed mb-8">
              Your turf will be <span className="text-lime-500 underline">LIVE</span> in the next 48 hours after a quick verification.
            </p>
            <Link 
              href="/" 
              className="inline-block px-10 py-4 bg-lime-500 text-black font-black uppercase tracking-widest text-sm hover:bg-lime-400 transition-all -skew-x-12 cursor-pointer shadow-[4px_4px_0px_#ffffff]"
            >
              <span className="skew-x-12 block uppercase tracking-widest">Go to Homepage</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen bg-zinc-950 text-white overflow-hidden font-sans relative flex">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-lime-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
      </div>

      {/* Sidebar Navigation */}
      <div className="w-80 border-r border-zinc-900 bg-black/40 backdrop-blur-3xl p-8 flex flex-col z-20 shrink-0">
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
              Turf<span className="text-lime-500">Box</span>
            </h1>
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-[2px] w-8 bg-lime-500"></div>
            <p className="text-zinc-600 text-[9px] uppercase font-black tracking-[0.2em]">Partner Portal</p>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center relative py-10">
          {/* Vertical Progress Line */}
          <div className="absolute left-6 top-12 bottom-12 w-[3px] bg-zinc-900/50 -z-10 rounded-full overflow-hidden border border-zinc-800/30">
            <div 
              className="w-full bg-lime-500 transition-all duration-700 ease-out shadow-[0_0_15px_#a3e635]" 
              style={{ height: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>

          <div className="space-y-6">
            {STEPS.map((step) => (
              <div 
                key={step.id} 
                className={`flex items-center gap-6 group transition-all duration-300 ${step.id < currentStep ? "cursor-pointer" : "cursor-default"}`}
                onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              >
                <div className={`w-12 h-12 flex items-center justify-center -skew-x-12 border-2 transition-all duration-500 relative ${
                  currentStep >= step.id 
                    ? "bg-lime-500 border-white text-black scale-110 shadow-[6px_6px_0px_rgba(163,230,53,0.2)]" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-600"
                }`}>
                  <div className="skew-x-12">
                    {currentStep > step.id ? <CheckCircle2 className="w-6 h-6 stroke-[3px]" /> : step.icon}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${currentStep >= step.id ? "text-lime-500" : "text-zinc-700"}`}>Step 0{step.id}</span>
                  <span className={`text-sm font-black uppercase tracking-widest transition-colors duration-500 ${currentStep >= step.id ? "text-white" : "text-zinc-600"}`}>{step.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-zinc-900/50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-1">Help & Support</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors cursor-pointer">partner@turfbox.in</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-zinc-950/20">
        <div className="min-h-full p-8 lg:px-16 lg:pt-10 lg:pb-16 max-w-5xl mx-auto w-full flex flex-col">
          {/* Top Header Section */}
          <div className="flex items-center justify-between mb-16 flex-shrink-0">
            <div className="space-y-1">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                Register your <span className="text-lime-500 text-6xl">Turf</span>
              </h2>
              <p className="text-zinc-500 text-sm font-bold tracking-tight">Expand your reach and manage your bookings effortlessly.</p>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-black bg-lime-500 px-4 py-2 -skew-x-12 shadow-[4px_4px_0px_#ffffff]">
              <span className="skew-x-12 block">Step {currentStep} of {STEPS.length}</span>
            </div>
          </div>

          {/* Dynamic Form Content */}
          <div className="flex-1 bg-zinc-900/40 border-2 border-zinc-800/50 backdrop-blur-md relative overflow-hidden -skew-x-1 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent pointer-events-none" />
            
            <div className="p-1 lg:p-12 skew-x-1 flex flex-col h-full">
              <div className="flex-1">
                {renderStep()}
              </div>

              {/* Action Buttons */}
              <div className="mt-12 pt-12 border-t border-zinc-800/80 flex items-center justify-between gap-6 shrink-0">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1 || isSubmitting}
                  className="group px-6 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-500 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 hover:text-white transition-all -skew-x-12 cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
                >
                  <span className="skew-x-12 flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4 stroke-[3px] group-hover:-translate-x-1 transition-transform" /> Back
                  </span>
                </button>
                
                {currentStep < STEPS.length ? (
                  <button
                    onClick={nextStep}
                    className="px-12 py-4 bg-lime-500 text-black font-black uppercase tracking-widest text-sm hover:bg-lime-400 transition-all -skew-x-12 cursor-pointer shadow-[6px_6px_0px_#ffffff] active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <span className="skew-x-12 flex items-center gap-2">
                      Next Step <ChevronRight className="w-5 h-5 stroke-[4px]" />
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-12 py-4 bg-lime-500 text-black font-black uppercase tracking-widest text-sm hover:bg-lime-400 transition-all -skew-x-12 cursor-pointer shadow-[6px_6px_0px_#ffffff] disabled:opacity-50 active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <span className="skew-x-12 flex items-center gap-2">
                      {isSubmitting ? "Processing..." : "Submit Registration"} <CheckCircle2 className="w-5 h-5 stroke-[3px]" />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
