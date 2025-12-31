import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
  actionText?: string;
}