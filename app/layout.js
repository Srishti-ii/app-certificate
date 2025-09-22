import './globals.css';

export const metadata = {
title: 'Certificate System',
description: 'Secure, tamper-proof digital certificates on the blockchain',
};

export default function RootLayout({ children }) {
return (
<html lang="en" suppressHydrationWarning={true}>
<body>{children}</body>
</html>
);
}
