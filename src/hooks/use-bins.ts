"use client";
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 1. Define the Interface here so the hook is "Type-Safe"
export interface Bin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  FillLevel: number; // Matches your Firebase capital 'F'
  status?: string;
}

export const useBins = () => {
  const [bins, setBins] = useState<Bin[]>([]); // 2. Explicitly tell the state to expect Bins

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bins"), (snapshot) => {
      const binList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Bin[]; // 3. Cast the Firebase data to our Interface
      setBins(binList);
    });

    return () => unsubscribe();
  }, []);

  return bins;
};