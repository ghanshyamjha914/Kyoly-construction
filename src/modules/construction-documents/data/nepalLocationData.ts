/**
 * Master Nepal Administrative Location Database
 * Reference: Government of Nepal / Ministry of Federal Affairs and General Administration (MoFAGA)
 * 7 Provinces, 77 Districts, and authoritative Local Levels with English & Nepali designations.
 */

import { MasterProvince, MasterDistrict, MasterLocalLevel } from '../types';

export const INITIAL_PROVINCES: MasterProvince[] = [
  { id: 'prov-1', code: 'P1', name: 'Koshi Province', nameNepali: 'कोशी प्रदेश', status: 'Active' },
  { id: 'prov-2', code: 'P2', name: 'Madhesh Province', nameNepali: 'मधेश प्रदेश', status: 'Active' },
  { id: 'prov-3', code: 'P3', name: 'Bagmati Province', nameNepali: 'बागमती प्रदेश', status: 'Active' },
  { id: 'prov-4', code: 'P4', name: 'Gandaki Province', nameNepali: 'गण्डकी प्रदेश', status: 'Active' },
  { id: 'prov-5', code: 'P5', name: 'Lumbini Province', nameNepali: 'लुम्बिनी प्रदेश', status: 'Active' },
  { id: 'prov-6', code: 'P6', name: 'Karnali Province', nameNepali: 'कर्णाली प्रदेश', status: 'Active' },
  { id: 'prov-7', code: 'P7', name: 'Sudurpashchim Province', nameNepali: 'सुदूरपश्चिम प्रदेश', status: 'Active' },
];

export const INITIAL_DISTRICTS: MasterDistrict[] = [
  // Koshi Province (14 Districts)
  { id: 'dist-bhojpur', provinceId: 'prov-1', code: 'BHO', name: 'Bhojpur', nameNepali: 'भोजपुर', status: 'Active' },
  { id: 'dist-dhankuta', provinceId: 'prov-1', code: 'DHA', name: 'Dhankuta', nameNepali: 'धनकुटा', status: 'Active' },
  { id: 'dist-ilam', provinceId: 'prov-1', code: 'ILA', name: 'Ilam', nameNepali: 'इलाम', status: 'Active' },
  { id: 'dist-jhapa', provinceId: 'prov-1', code: 'JHA', name: 'Jhapa', nameNepali: 'झापा', status: 'Active' },
  { id: 'dist-khotang', provinceId: 'prov-1', code: 'KHO', name: 'Khotang', nameNepali: 'खोटाङ', status: 'Active' },
  { id: 'dist-morang', provinceId: 'prov-1', code: 'MOR', name: 'Morang', nameNepali: 'मोरङ', status: 'Active' },
  { id: 'dist-okhaldhunga', provinceId: 'prov-1', code: 'OKH', name: 'Okhaldhunga', nameNepali: 'ओखलढुङ्गा', status: 'Active' },
  { id: 'dist-panchthar', provinceId: 'prov-1', code: 'PAN', name: 'Panchthar', nameNepali: 'पाँचथर', status: 'Active' },
  { id: 'dist-sankhuwasabha', provinceId: 'prov-1', code: 'SAN', name: 'Sankhuwasabha', nameNepali: 'सङ्खुवासभा', status: 'Active' },
  { id: 'dist-solukhumbu', provinceId: 'prov-1', code: 'SOL', name: 'Solukhumbu', nameNepali: 'सोलुखुम्बु', status: 'Active' },
  { id: 'dist-sunsari', provinceId: 'prov-1', code: 'SUN', name: 'Sunsari', nameNepali: 'सुनसरी', status: 'Active' },
  { id: 'dist-taplejung', provinceId: 'prov-1', code: 'TAP', name: 'Taplejung', nameNepali: 'ताप्लेजुङ', status: 'Active' },
  { id: 'dist-terhathum', provinceId: 'prov-1', code: 'TER', name: 'Terhathum', nameNepali: 'तेह्रथुम', status: 'Active' },
  { id: 'dist-udayapur', provinceId: 'prov-1', code: 'UDA', name: 'Udayapur', nameNepali: 'उदयपुर', status: 'Active' },

  // Madhesh Province (8 Districts)
  { id: 'dist-saptari', provinceId: 'prov-2', code: 'SAP', name: 'Saptari', nameNepali: 'सप्तरी', status: 'Active' },
  { id: 'dist-siraha', provinceId: 'prov-2', code: 'SIR', name: 'Siraha', nameNepali: 'सिराहा', status: 'Active' },
  { id: 'dist-dhanusha', provinceId: 'prov-2', code: 'DHA-M', name: 'Dhanusha', nameNepali: 'धनुषा', status: 'Active' },
  { id: 'dist-mahattari', provinceId: 'prov-2', code: 'MAH', name: 'Mahottari', nameNepali: 'महोत्तरी', status: 'Active' },
  { id: 'dist-sarlahi', provinceId: 'prov-2', code: 'SAR', name: 'Sarlahi', nameNepali: 'सर्लाही', status: 'Active' },
  { id: 'dist-rautahat', provinceId: 'prov-2', code: 'RAU', name: 'Rautahat', nameNepali: 'रौतहट', status: 'Active' },
  { id: 'dist-bara', provinceId: 'prov-2', code: 'BAR', name: 'Bara', nameNepali: 'बारा', status: 'Active' },
  { id: 'dist-parsa', provinceId: 'prov-2', code: 'PAR', name: 'Parsa', nameNepali: 'पर्सा', status: 'Active' },

  // Bagmati Province (13 Districts)
  { id: 'dist-kathmandu', provinceId: 'prov-3', code: 'KTM', name: 'Kathmandu', nameNepali: 'काठमाडौँ', status: 'Active' },
  { id: 'dist-lalitpur', provinceId: 'prov-3', code: 'LAL', name: 'Lalitpur', nameNepali: 'ललितपुर', status: 'Active' },
  { id: 'dist-bhaktapur', provinceId: 'prov-3', code: 'BHK', name: 'Bhaktapur', nameNepali: 'भक्तपुर', status: 'Active' },
  { id: 'dist-kavrepalanchok', provinceId: 'prov-3', code: 'KAV', name: 'Kavrepalanchok', nameNepali: 'काभ्रेपलाञ्चोक', status: 'Active' },
  { id: 'dist-sindhupalchok', provinceId: 'prov-3', code: 'SIN', name: 'Sindhupalchok', nameNepali: 'सिन्धुपाल्चोक', status: 'Active' },
  { id: 'dist-makwanpur', provinceId: 'prov-3', code: 'MAK', name: 'Makwanpur', nameNepali: 'मकवानपुर', status: 'Active' },
  { id: 'dist-chitwan', provinceId: 'prov-3', code: 'CHT', name: 'Chitwan', nameNepali: 'चितवन', status: 'Active' },
  { id: 'dist-dhading', provinceId: 'prov-3', code: 'DHA-B', name: 'Dhading', nameNepali: 'धादिङ', status: 'Active' },
  { id: 'dist-nuwakot', provinceId: 'prov-3', code: 'NUW', name: 'Nuwakot', nameNepali: 'नुवाकोट', status: 'Active' },
  { id: 'dist-rasuwa', provinceId: 'prov-3', code: 'RAS', name: 'Rasuwa', nameNepali: 'रसुवा', status: 'Active' },
  { id: 'dist-sindhuli', provinceId: 'prov-3', code: 'SND', name: 'Sindhuli', nameNepali: 'सिन्धुली', status: 'Active' },
  { id: 'dist-ramechhap', provinceId: 'prov-3', code: 'RAM', name: 'Ramechhap', nameNepali: 'रामेछाप', status: 'Active' },
  { id: 'dist-dolakha', provinceId: 'prov-3', code: 'DOL', name: 'Dolakha', nameNepali: 'दोलखा', status: 'Active' },

  // Gandaki Province (11 Districts)
  { id: 'dist-kaski', provinceId: 'prov-4', code: 'KAS', name: 'Kaski', nameNepali: 'कास्की', status: 'Active' },
  { id: 'dist-tanahun', provinceId: 'prov-4', code: 'TAN', name: 'Tanahun', nameNepali: 'तनहुँ', status: 'Active' },
  { id: 'dist-syangja', provinceId: 'prov-4', code: 'SYA', name: 'Syangja', nameNepali: 'स्याङ्जा', status: 'Active' },
  { id: 'dist-gorkha', provinceId: 'prov-4', code: 'GOR', name: 'Gorkha', nameNepali: 'गोरखा', status: 'Active' },
  { id: 'dist-lamjung', provinceId: 'prov-4', code: 'LAM', name: 'Lamjung', nameNepali: 'लमजुङ', status: 'Active' },
  { id: 'dist-nawalpur', provinceId: 'prov-4', code: 'NAW-E', name: 'Nawalpur (Nawalparasi East)', nameNepali: 'नवलपुर (नवलपरासी पूर्व)', status: 'Active' },
  { id: 'dist-baglung', provinceId: 'prov-4', code: 'BAG', name: 'Baglung', nameNepali: 'बागलुङ', status: 'Active' },
  { id: 'dist-parbat', provinceId: 'prov-4', code: 'PRB', name: 'Parbat', nameNepali: 'पर्वत', status: 'Active' },
  { id: 'dist-myagdi', provinceId: 'prov-4', code: 'MYA', name: 'Myagdi', nameNepali: 'म्याग्दी', status: 'Active' },
  { id: 'dist-manang', provinceId: 'prov-4', code: 'MAN', name: 'Manang', nameNepali: 'मनाङ', status: 'Active' },
  { id: 'dist-mustang', provinceId: 'prov-4', code: 'MUS', name: 'Mustang', nameNepali: 'मुस्ताङ', status: 'Active' },

  // Lumbini Province (12 Districts)
  { id: 'dist-rupandehi', provinceId: 'prov-5', code: 'RUP', name: 'Rupandehi', nameNepali: 'रुपन्देही', status: 'Active' },
  { id: 'dist-kapilvastu', provinceId: 'prov-5', code: 'KAP', name: 'Kapilvastu', nameNepali: 'कपिलवस्तु', status: 'Active' },
  { id: 'dist-parasi', provinceId: 'prov-5', code: 'PAR-W', name: 'Parasi (Nawalparasi West)', nameNepali: 'परासी (नवलपरासी पश्चिम)', status: 'Active' },
  { id: 'dist-palpa', provinceId: 'prov-5', code: 'PAL', name: 'Palpa', nameNepali: 'पाल्पा', status: 'Active' },
  { id: 'dist-gulmi', provinceId: 'prov-5', code: 'GUL', name: 'Gulmi', nameNepali: 'गुल्मी', status: 'Active' },
  { id: 'dist-arghakhanchi', provinceId: 'prov-5', code: 'ARG', name: 'Arghakhanchi', nameNepali: 'अर्घाखाँची', status: 'Active' },
  { id: 'dist-dang', provinceId: 'prov-5', code: 'DAN', name: 'Dang', nameNepali: 'दाङ', status: 'Active' },
  { id: 'dist-banke', provinceId: 'prov-5', code: 'BAN', name: 'Banke', nameNepali: 'बाँके', status: 'Active' },
  { id: 'dist-bardiya', provinceId: 'prov-5', code: 'BAR-L', name: 'Bardiya', nameNepali: 'बर्दिया', status: 'Active' },
  { id: 'dist-pyuthan', provinceId: 'prov-5', code: 'PYU', name: 'Pyuthan', nameNepali: 'प्युठान', status: 'Active' },
  { id: 'dist-rolpa', provinceId: 'prov-5', code: 'ROL', name: 'Rolpa', nameNepali: 'रोल्पा', status: 'Active' },
  { id: 'dist-rukum-east', provinceId: 'prov-5', code: 'RUK-E', name: 'Eastern Rukum', nameNepali: 'पूर्वी रुकुम', status: 'Active' },

  // Karnali Province (10 Districts)
  { id: 'dist-surkhet', provinceId: 'prov-6', code: 'SUR', name: 'Surkhet', nameNepali: 'सुर्खेत', status: 'Active' },
  { id: 'dist-dailekh', provinceId: 'prov-6', code: 'DAI', name: 'Dailekh', nameNepali: 'दैलेख', status: 'Active' },
  { id: 'dist-jajarkot', provinceId: 'prov-6', code: 'JAJ', name: 'Jajarkot', nameNepali: 'जाजरकोट', status: 'Active' },
  { id: 'dist-salyan', provinceId: 'prov-6', code: 'SAL', name: 'Salyan', nameNepali: 'सल्यान', status: 'Active' },
  { id: 'dist-rukum-west', provinceId: 'prov-6', code: 'RUK-W', name: 'Western Rukum', nameNepali: 'पश्चिम रुकुम', status: 'Active' },
  { id: 'dist-jumla', provinceId: 'prov-6', code: 'JUM', name: 'Jumla', nameNepali: 'जुम्ला', status: 'Active' },
  { id: 'dist-kalikot', provinceId: 'prov-6', code: 'KAL', name: 'Kalikot', nameNepali: 'कालिकोट', status: 'Active' },
  { id: 'dist-mugu', provinceId: 'prov-6', code: 'MUG', name: 'Mugu', nameNepali: 'मुगु', status: 'Active' },
  { id: 'dist-humla', provinceId: 'prov-6', code: 'HUM', name: 'Humla', nameNepali: 'हुम्ला', status: 'Active' },
  { id: 'dist-dolpa', provinceId: 'prov-6', code: 'DOL-K', name: 'Dolpa', nameNepali: 'डोल्पा', status: 'Active' },

  // Sudurpashchim Province (9 Districts)
  { id: 'dist-kailali', provinceId: 'prov-7', code: 'KAI', name: 'Kailali', nameNepali: 'कैलाली', status: 'Active' },
  { id: 'dist-kanchanpur', provinceId: 'prov-7', code: 'KNC', name: 'Kanchanpur', nameNepali: 'कञ्चनपुर', status: 'Active' },
  { id: 'dist-dadeldhura', provinceId: 'prov-7', code: 'DAD', name: 'Dadeldhura', nameNepali: 'डडेल्धुरा', status: 'Active' },
  { id: 'dist-doti', provinceId: 'prov-7', code: 'DOT', name: 'Doti', nameNepali: 'डोटी', status: 'Active' },
  { id: 'dist-achham', provinceId: 'prov-7', code: 'ACH', name: 'Achham', nameNepali: 'अछाम', status: 'Active' },
  { id: 'dist-bajhang', provinceId: 'prov-7', code: 'BAJ', name: 'Bajhang', nameNepali: 'बझाङ', status: 'Active' },
  { id: 'dist-bajura', provinceId: 'prov-7', code: 'BJR', name: 'Bajura', nameNepali: 'बाजुरा', status: 'Active' },
  { id: 'dist-baitadi', provinceId: 'prov-7', code: 'BAI', name: 'Baitadi', nameNepali: 'बैतडी', status: 'Active' },
  { id: 'dist-darchula', provinceId: 'prov-7', code: 'DAR', name: 'Darchula', nameNepali: 'दार्चुला', status: 'Active' },
];

export const INITIAL_LOCAL_LEVELS: MasterLocalLevel[] = [
  // Kathmandu District
  { id: 'll-ktm-metro', districtId: 'dist-kathmandu', code: 'KTM-METRO', name: 'Kathmandu Metropolitan City', nameNepali: 'काठमाडौँ महानगरपालिका', type: 'Metropolitan City', totalWards: 32, status: 'Active' },
  { id: 'll-budhanilkantha', districtId: 'dist-kathmandu', code: 'KTM-BDN', name: 'Budhanilkantha Municipality', nameNepali: 'बुढानीलकण्ठ नगरपालिका', type: 'Municipality', totalWards: 13, status: 'Active' },
  { id: 'll-tokha', districtId: 'dist-kathmandu', code: 'KTM-TOK', name: 'Tokha Municipality', nameNepali: 'टोखा नगरपालिका', type: 'Municipality', totalWards: 11, status: 'Active' },
  { id: 'll-tarakeshwor', districtId: 'dist-kathmandu', code: 'KTM-TAR', name: 'Tarakeshwor Municipality', nameNepali: 'तारकेश्वर नगरपालिका', type: 'Municipality', totalWards: 11, status: 'Active' },
  { id: 'll-nagarjun', districtId: 'dist-kathmandu', code: 'KTM-NAG', name: 'Nagarjun Municipality', nameNepali: 'नागार्जुन नगरपालिका', type: 'Municipality', totalWards: 10, status: 'Active' },
  { id: 'll-chandragiri', districtId: 'dist-kathmandu', code: 'KTM-CHN', name: 'Chandragiri Municipality', nameNepali: 'चन्द्रागिरी नगरपालिका', type: 'Municipality', totalWards: 15, status: 'Active' },
  { id: 'll-kirtipur', districtId: 'dist-kathmandu', code: 'KTM-KIR', name: 'Kirtipur Municipality', nameNepali: 'कीर्तिपुर नगरपालिका', type: 'Municipality', totalWards: 10, status: 'Active' },
  { id: 'll-dakshinkali', districtId: 'dist-kathmandu', code: 'KTM-DAK', name: 'Dakshinkali Municipality', nameNepali: 'दक्षिणकाली नगरपालिका', type: 'Municipality', totalWards: 9, status: 'Active' },
  { id: 'll-gokarneshwor', districtId: 'dist-kathmandu', code: 'KTM-GOK', name: 'Gokarneshwor Municipality', nameNepali: 'गोकर्णेश्वर नगरपालिका', type: 'Municipality', totalWards: 9, status: 'Active' },
  { id: 'll-kageshwori', districtId: 'dist-kathmandu', code: 'KTM-KAG', name: 'Kageshwori Manohara Municipality', nameNepali: 'कागेश्वरी मनोहरा नगरपालिका', type: 'Municipality', totalWards: 9, status: 'Active' },
  { id: 'll-shankharapur', districtId: 'dist-kathmandu', code: 'KTM-SHN', name: 'Shankharapur Municipality', nameNepali: 'शङ्खरापुर नगरपालिका', type: 'Municipality', totalWards: 9, status: 'Active' },

  // Lalitpur District
  { id: 'll-lal-metro', districtId: 'dist-lalitpur', code: 'LAL-METRO', name: 'Lalitpur Metropolitan City', nameNepali: 'ललितपुर महानगरपालिका', type: 'Metropolitan City', totalWards: 29, status: 'Active' },
  { id: 'll-mahalaxmi', districtId: 'dist-lalitpur', code: 'LAL-MAH', name: 'Mahalaxmi Municipality', nameNepali: 'महालक्ष्मी नगरपालिका', type: 'Municipality', totalWards: 10, status: 'Active' },
  { id: 'll-godawari', districtId: 'dist-lalitpur', code: 'LAL-GOD', name: 'Godawari Municipality', nameNepali: 'गोदावरी नगरपालिका', type: 'Municipality', totalWards: 14, status: 'Active' },
  { id: 'll-konjyosom', districtId: 'dist-lalitpur', code: 'LAL-KON', name: 'Konjyosom Rural Municipality', nameNepali: 'कोन्ज्योसोम गाउँपालिका', type: 'Rural Municipality', totalWards: 5, status: 'Active' },
  { id: 'll-bagmati-rm', districtId: 'dist-lalitpur', code: 'LAL-BAG', name: 'Bagmati Rural Municipality', nameNepali: 'बागमती गाउँपालिका', type: 'Rural Municipality', totalWards: 7, status: 'Active' },
  { id: 'll-mahankal', districtId: 'dist-lalitpur', code: 'LAL-MAK', name: 'Mahankal Rural Municipality', nameNepali: 'महाङ्काल गाउँपालिका', type: 'Rural Municipality', totalWards: 6, status: 'Active' },

  // Bhaktapur District
  { id: 'll-bhaktapur-mun', districtId: 'dist-bhaktapur', code: 'BHK-MUN', name: 'Bhaktapur Municipality', nameNepali: 'भक्तपुर नगरपालिका', type: 'Municipality', totalWards: 10, status: 'Active' },
  { id: 'll-madhyapur', districtId: 'dist-bhaktapur', code: 'BHK-MAD', name: 'Madhyapur Thimi Municipality', nameNepali: 'मध्यपुर थिमी नगरपालिका', type: 'Municipality', totalWards: 9, status: 'Active' },
  { id: 'll-suryabinayak', districtId: 'dist-bhaktapur', code: 'BHK-SUR', name: 'Suryabinayak Municipality', nameNepali: 'सूर्यविनायक नगरपालिका', type: 'Municipality', totalWards: 10, status: 'Active' },
  { id: 'll-changunarayan', districtId: 'dist-bhaktapur', code: 'BHK-CHN', name: 'Changunarayan Municipality', nameNepali: 'चाँगुनारायण नगरपालिका', type: 'Municipality', totalWards: 9, status: 'Active' },

  // Kaski District (Gandaki)
  { id: 'll-pokhara-metro', districtId: 'dist-kaski', code: 'KAS-POK', name: 'Pokhara Metropolitan City', nameNepali: 'पोखरा महानगरपालिका', type: 'Metropolitan City', totalWards: 33, status: 'Active' },
  { id: 'll-annapurna-kaski', districtId: 'dist-kaski', code: 'KAS-ANN', name: 'Annapurna Rural Municipality', nameNepali: 'अन्नपूर्ण गाउँपालिका', type: 'Rural Municipality', totalWards: 11, status: 'Active' },
  { id: 'll-rupa', districtId: 'dist-kaski', code: 'KAS-RUP', name: 'Rupa Rural Municipality', nameNepali: 'रूपा गाउँपालिका', type: 'Rural Municipality', totalWards: 7, status: 'Active' },

  // Chitwan District
  { id: 'll-bharatpur-metro', districtId: 'dist-chitwan', code: 'CHT-BHR', name: 'Bharatpur Metropolitan City', nameNepali: 'भरतपुर महानगरपालिका', type: 'Metropolitan City', totalWards: 29, status: 'Active' },
  { id: 'll-ratnanagar', districtId: 'dist-chitwan', code: 'CHT-RAT', name: 'Ratnanagar Municipality', nameNepali: 'रत्ननगर नगरपालिका', type: 'Municipality', totalWards: 16, status: 'Active' },

  // Morang District (Koshi)
  { id: 'll-biratnagar-metro', districtId: 'dist-morang', code: 'MOR-BRT', name: 'Biratnagar Metropolitan City', nameNepali: 'विराटनगर महानगरपालिका', type: 'Metropolitan City', totalWards: 19, status: 'Active' },
  { id: 'll-sundarharaicha', districtId: 'dist-morang', code: 'MOR-SUN', name: 'Sundarharaicha Municipality', nameNepali: 'सुन्दरहरैँचा नगरपालिका', type: 'Municipality', totalWards: 12, status: 'Active' },

  // Parsa District (Madhesh)
  { id: 'll-birgunj-metro', districtId: 'dist-parsa', code: 'PAR-BRG', name: 'Birgunj Metropolitan City', nameNepali: 'वीरगञ्ज महानगरपालिका', type: 'Metropolitan City', totalWards: 32, status: 'Active' },

  // Rupandehi District (Lumbini)
  { id: 'll-butwal-sub', districtId: 'dist-rupandehi', code: 'RUP-BTW', name: 'Butwal Sub-Metropolitan City', nameNepali: 'बुटवल उपमहानगरपालिका', type: 'Sub-Metropolitan City', totalWards: 19, status: 'Active' },
  { id: 'll-siddharthanagar', districtId: 'dist-rupandehi', code: 'RUP-SID', name: 'Siddharthanagar Municipality', nameNepali: 'सिद्धार्थनगर नगरपालिका', type: 'Municipality', totalWards: 13, status: 'Active' },
  { id: 'll-tilottama', districtId: 'dist-rupandehi', code: 'RUP-TIL', name: 'Tilottama Municipality', nameNepali: 'तिलोत्तमा नगरपालिका', type: 'Municipality', totalWards: 17, status: 'Active' },

  // Makwanpur District
  { id: 'll-hetauda-sub', districtId: 'dist-makwanpur', code: 'MAK-HET', name: 'Hetauda Sub-Metropolitan City', nameNepali: 'हेटौँडा उपमहानगरपालिका', type: 'Sub-Metropolitan City', totalWards: 19, status: 'Active' },

  // Sunsari District
  { id: 'll-dharan-sub', districtId: 'dist-sunsari', code: 'SUN-DHR', name: 'Dharan Sub-Metropolitan City', nameNepali: 'धरान उपमहानगरपालिका', type: 'Sub-Metropolitan City', totalWards: 20, status: 'Active' },
  { id: 'll-itahari-sub', districtId: 'dist-sunsari', code: 'SUN-ITA', name: 'Itahari Sub-Metropolitan City', nameNepali: 'इटहरी उपमहानगरपालिका', type: 'Sub-Metropolitan City', totalWards: 20, status: 'Active' },

  // Dhanusha District
  { id: 'll-janakpur-sub', districtId: 'dist-dhanusha', code: 'DHA-JAN', name: 'Janakpurdham Sub-Metropolitan City', nameNepali: 'जनकपुरधाम उपमहानगरपालिका', type: 'Sub-Metropolitan City', totalWards: 25, status: 'Active' },

  // Banke District
  { id: 'll-nepalgunj-sub', districtId: 'dist-banke', code: 'BAN-NEP', name: 'Nepalgunj Sub-Metropolitan City', nameNepali: 'नेपालगञ्ज उपमहानगरपालिका', type: 'Sub-Metropolitan City', totalWards: 23, status: 'Active' },

  // Dang District
  { id: 'll-ghorahi-sub', districtId: 'dist-dang', code: 'DAN-GHO', name: 'Ghorahi Sub-Metropolitan City', nameNepali: 'घोराही उपमहानगरपालिका', type: 'Sub-Metropolitan City', totalWards: 19, status: 'Active' },
  { id: 'll-tulsipur-sub', districtId: 'dist-dang', code: 'DAN-TUL', name: 'Tulsipur Sub-Metropolitan City', nameNepali: 'तुलसीपुर उपमहानगरपालिका', type: 'Sub-Metropolitan City', totalWards: 19, status: 'Active' },

  // Kailali District
  { id: 'll-dhangadhi-sub', districtId: 'dist-kailali', code: 'KAI-DHN', name: 'Dhangadhi Sub-Metropolitan City', nameNepali: 'धनगढी उपमहानगरपालिका', type: 'Sub-Metropolitan City', totalWards: 19, status: 'Active' },

  // Surkhet District
  { id: 'll-birendranagar', districtId: 'dist-surkhet', code: 'SUR-BIR', name: 'Birendranagar Municipality', nameNepali: 'वीरेन्द्रनगर नगरपालिका', type: 'Municipality', totalWards: 16, status: 'Active' },

  // Kavrepalanchok District
  { id: 'll-dhulikhel', districtId: 'dist-kavrepalanchok', code: 'KAV-DHU', name: 'Dhulikhel Municipality', nameNepali: 'धुलिखेल नगरपालिका', type: 'Municipality', totalWards: 12, status: 'Active' },
  { id: 'll-banepa', districtId: 'dist-kavrepalanchok', code: 'KAV-BAN', name: 'Banepa Municipality', nameNepali: 'बनेपा नगरपालिका', type: 'Municipality', totalWards: 14, status: 'Active' },
  { id: 'll-panauti', districtId: 'dist-kavrepalanchok', code: 'KAV-PAN', name: 'Panauti Municipality', nameNepali: 'पनौती नगरपालिका', type: 'Municipality', totalWards: 12, status: 'Active' },
];

/**
 * Helper utilities for querying location hierarchy
 */
export function getDistrictsByProvince(provinceId: string, districts: MasterDistrict[] = INITIAL_DISTRICTS): MasterDistrict[] {
  return districts.filter((d) => d.provinceId === provinceId && d.status !== 'Inactive');
}

export function getLocalLevelsByDistrict(districtId: string, localLevels: MasterLocalLevel[] = INITIAL_LOCAL_LEVELS): MasterLocalLevel[] {
  return localLevels.filter((ll) => ll.districtId === districtId && ll.status !== 'Inactive');
}

export function getWardsArray(totalWards: number): number[] {
  const wards: number[] = [];
  for (let i = 1; i <= Math.max(1, totalWards); i++) {
    wards.push(i);
  }
  return wards;
}
