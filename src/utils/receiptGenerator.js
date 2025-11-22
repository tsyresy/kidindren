// src/utils/receiptGenerator.js
import jsPDF from 'jspdf'

export const generateReceipt = async (transactionData, userData, planData) => {
    // Validation des paramètres
    if (!transactionData || !userData || !planData) {
        throw new Error('Paramètres manquants pour générer le reçu')
    }

    const {
        transactionType,
        amount,
        currency,
        finalAmount,
        transactionId,
        date,
        ticketNumber,
        operator,
        mobileMoneyAccount,
        commissionRate
    } = transactionData

    const {
        fullName = 'Non renseigné',
        documentType = 'CIN',
        documentNumber = 'Non renseigné',
        address = 'Non renseigné',
        phone = 'Non renseigné',
        email = 'Non renseigné'
    } = userData

    // Validation des valeurs requises
    if (!amount || !currency || !finalAmount) {
        throw new Error('Données de transaction incomplètes')
    }

    const pdf = new jsPDF()

    // Couleurs Payvilus
    const primaryColor = [22, 249, 138] // #16f98a
    const darkColor = [1, 15, 27] // #010F1B

    let yPos = 20

    // === HEADER ===
    pdf.setFillColor(...primaryColor)
    pdf.rect(0, 0, 210, 40, 'F')

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(28)
    pdf.setFont('helvetica', 'bold')
    pdf.text('PAYVILUS', 105, 20, { align: 'center' })

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Reçu de Transaction', 105, 30, { align: 'center' })

    yPos = 50

    // === INFORMATIONS DE TRANSACTION ===
    pdf.setTextColor(...darkColor)
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Détails de la Transaction', 20, yPos)

    yPos += 10
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')

    // Cadre gris pour les infos
    pdf.setFillColor(248, 248, 248)
    pdf.rect(20, yPos - 5, 170, 45, 'F')
    pdf.setDrawColor(...primaryColor)
    pdf.setLineWidth(0.5)
    pdf.rect(20, yPos - 5, 170, 45)

    pdf.setFont('helvetica', 'bold')
    pdf.text('Type de transaction:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(transactionType === 'deposit' ? 'Dépôt (Mobile Money → PayPal)' : 'Retrait (PayPal → Mobile Money)', 70, yPos)

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('Montant:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${amount.toFixed(2)} ${currency}`, 70, yPos)

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('Commission:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${commissionRate}%`, 70, yPos)

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('Montant final:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(...primaryColor)
    pdf.setFontSize(12)
    pdf.text(`${finalAmount.toLocaleString('fr-FR')} MGA`, 70, yPos)
    pdf.setTextColor(...darkColor)
    pdf.setFontSize(10)

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('ID Transaction:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(transactionId, 70, yPos)

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('Date:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(new Date(date).toLocaleDateString('fr-FR'), 70, yPos)

    yPos += 15

    // === INFORMATIONS PERSONNELLES ===
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Informations Personnelles', 20, yPos)

    yPos += 10
    pdf.setFontSize(10)

    // Cadre gris
    pdf.setFillColor(248, 248, 248)
    pdf.rect(20, yPos - 5, 170, 45, 'F')
    pdf.setDrawColor(...primaryColor)
    pdf.rect(20, yPos - 5, 170, 45)

    pdf.setFont('helvetica', 'bold')
    pdf.text('Nom complet:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(fullName, 70, yPos)

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('Document:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${documentType} - ${documentNumber}`, 70, yPos)

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('Adresse:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    const addressLines = pdf.splitTextToSize(address, 120)
    pdf.text(addressLines, 70, yPos)
    yPos += (addressLines.length - 1) * 5

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('Téléphone:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(phone, 70, yPos)

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('Email:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(email, 70, yPos)

    yPos += 15

    // === DÉTAILS OPÉRATEUR ===
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Détails de Paiement', 20, yPos)

    yPos += 10
    pdf.setFontSize(10)

    pdf.setFillColor(248, 248, 248)
    pdf.rect(20, yPos - 5, 170, 20, 'F')
    pdf.setDrawColor(...primaryColor)
    pdf.rect(20, yPos - 5, 170, 20)

    pdf.setFont('helvetica', 'bold')
    pdf.text('Opérateur:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(operator, 70, yPos)

    yPos += 8
    pdf.setFont('helvetica', 'bold')
    pdf.text('Compte:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(mobileMoneyAccount, 70, yPos)

    yPos += 15

    // === PLAN D'ABONNEMENT ===
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Plan d\'Abonnement', 20, yPos)

    yPos += 10
    pdf.setFontSize(10)

    pdf.setFillColor(248, 248, 248)
    pdf.rect(20, yPos - 5, 170, 12, 'F')
    pdf.setDrawColor(...primaryColor)
    pdf.rect(20, yPos - 5, 170, 12)

    pdf.setFont('helvetica', 'bold')
    pdf.text('Plan:', 25, yPos)
    pdf.setFont('helvetica', 'normal')
    pdf.text(planData.name, 70, yPos)

    yPos += 15

    // === NUMÉRO DE TICKET ===
    pdf.setFillColor(...primaryColor)
    pdf.rect(20, yPos - 5, 170, 15, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`Ticket N° ${ticketNumber}`, 105, yPos + 3, { align: 'center' })

    yPos += 20
    pdf.setTextColor(...darkColor)

    // === CONDITIONS ET CLAUSES ===
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')

    const terms = [
        'Je confirme avoir effectué cette transaction avec Payvilus.',
        'J\'accepte les termes et conditions de service de Payvilus.',
        'Je comprends que les transactions sont sujettes aux délais de traitement selon mon plan d\'abonnement.',
        'Toute fraude ou fausse déclaration entraînera la suspension du compte.'
    ]

    terms.forEach((term, index) => {
        pdf.text(`• ${term}`, 20, yPos)
        yPos += 5
    })

    yPos += 5

    // === FOOTER ===
    pdf.setFillColor(1, 15, 27)
    pdf.rect(0, 280, 210, 17, 'F')

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(8)
    pdf.text('Payvilus © 2025 - Tous droits réservés', 105, 288, { align: 'center' })
    pdf.text('Email: servicespaypal.waviloid@gmail.com | Web: payvilus.store', 105, 293, { align: 'center' })

    return pdf
}

export const downloadReceipt = (pdf, ticketNumber) => {
    pdf.save(`Payvilus_Recu_${ticketNumber}.pdf`)
}

export const getPdfBlob = (pdf) => {
    return pdf.output('blob')
}