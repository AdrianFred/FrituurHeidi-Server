import { createToken } from "../../utilities/jsonwebtoken.js";
import { transporter } from "../../../config/nodermailer.js";

export const resetPassword = async (prisma, req, res) => {
  const { email } = req.body;
  const emailLower = email.toLowerCase();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: emailLower,
      },
    });

    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (user) {
      const token = await createToken(user.email);
      const link = process.env.RESET_PASSWORD_URL + token;

      const mailOptions = {
        from: process.env.EMAIL,
        sender: "Frituur Heidi",
        replyTo: user.email,
        to: user.email,
        subject: "Frituur Heidi - Wachtwoord Resetten",
        previewText: "Wachtwoord resetten voor je Frituur Heidi account",
        html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> <html xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap" rel="stylesheet"> <title>Frituur Heidi - Wachtwoord Resetten</title> <style type="text/css"> *{-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}html, body{padding: 0 !important; height: 100% !important; width: 100% !important; margin: 0 !important;}div[style*="margin: 16px 0"]{margin:0 !important;}table, td{mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;}table{border-spacing: 0 !important; margin: 0 auto !important;}a{text-decoration:none;}.yshortcuts a{border-bottom: none !important;}a[x-apple-data-detectors]{color:inherit !important; text-decoration: underline !important;}.applelinks a{color:#222222; text-decoration: none;}th{padding:0 !important; margin:0px !important;}span.MsoHyperlink{mso-style-priority:99; color:inherit;}span.MsoHyperlinkFollowed{mso-style-priority:99; color:inherit;}#MessageViewBody, #MessageWebViewDiv{width: 100% !important;}@media screen yahoo{*{overflow: visible!important;}.y-overflow-hidden{overflow: hidden!important;}}.columns{display: inline-block; text-align: center;}#preheader{display:none;}#bg_img{background-image:url(https://i.imgur.com/YJOX1PC.png);}@media screen and (max-width: 600px){.quarter{width: 25% !important; max-width: 25% !important;}.third{width: 33.333% !important; max-width: 33.333% !important;}.second{width: 50% !important; max-width: 50% !important;}.full{width: 100% !important; max-width: 100% !important;}.m_hide{display: none !important;}.m_show{display: block !important;}.m_wrapper{padding: 0 15px !important;}}@media screen and (max-width: 480px){.btn_table{width: 100% !important; display: table !important;}.btn_td{padding:0 !important; display:block !important; font-size:14px !important; font-weight:bold !important; padding:6px 4px 8px 4px !important; line-height:18px !important; border-radius:5px !important; margin:10px auto; width:70% !important; text-align:center; text-decoration:none;font-weight:500 !important;}.quarter{width: 50% !important; max-width: 50% !important;}.second, .third{width: 100% !important; max-width: 100% !important;}}</style><!--[if (gte mso 9)|(IE)]> <style type="text/css"> .block_285{width: 285px !important;}.block_190{width: 190px !important;}.block_142{width: 142px !important;}</style><![endif]--> </head> <body width="100%" bgcolor="#D0D5D6" style="margin: 0; padding: 0;"> <table id="preheader" class="m_show" style="display:none;" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#D0D5D6"> <tr><td align="center">Wachtwoord resetten voor je Frituur Heidi account</td></tr></table> <div style="display: none; max-height: 0px; overflow: hidden;"> &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; </div><table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style=""> <table border="0" cellspacing="0" cellpadding="0" width="100%"> <tr> <td style="font-size:0;line-height:1px;height:20px;" height="20">&nbsp;</td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#D0D5D6"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table bgcolor="#1B1B1E" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style=""> <table border="0" cellspacing="0" cellpadding="0" width="100%"> <tr> <td style="font-size:0;line-height:1px;height:20px;" height="20">&nbsp;</td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#D0D5D6"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;" align="center" bgcolor="#D0D5D6"> <table bgcolor="#1B1B1E" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" align="center" style="padding-left:40%;padding-right:40%"> <tr> <td style="text-align:left; font-family: 'Roboto Slab', serif !important; font-size:2rem; mso-line-height-rule:exactly; line-height:20px; color:#1B1B1E;max-height: 999999px; word-wrap: break-word; word-break: break-word;text-align:center;" align="center"> <a href="https://www.selligent.com/" target="_blank" rel="noopener noreferrer" style="text-decoration:none;cursor:default;" > <img id="OWATemporaryImageDivContainer1" class="full" src="https://i.ibb.co/KFfbTD3/Logo-2023.png" alt="alt" border="0" width="100%" style="width:100%; max-width:100%; display:block;"/> </a> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#D0D5D6"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table bgcolor="#1B1B1E" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style=""> <table border="0" cellspacing="0" cellpadding="0" width="100%"> <tr> <td style="font-size:0;line-height:1px;height:20px;" height="20">&nbsp;</td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#D0D5D6"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table bgcolor="#EFEFEF" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#1B1B1E" style="padding: 25px"> <tr> <td style="text-align:left; font-family: 'Roboto Slab', serif !important; font-size:2rem; mso-line-height-rule:exactly; line-height:20px; color:#FEBD00;max-height: 999999px; word-wrap: break-word; word-break: break-word;text-align:center;" align="center"> Frituur Heidi </td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#D0D5D6"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table bgcolor="#EFEFEF" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style="padding: 25px;"> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style="text-align:left; font-family: 'Roboto Slab', serif !important; font-size:16px; mso-line-height-rule:exactly; line-height:20px; color:#1B1B1E;max-height: 999999px; word-wrap: break-word; word-break: break-word;text-align:left;" align="center"> Beste <span style="color:#F44336">${
          user.firstName.charAt(0).toUpperCase() + user.firstName.substring(1)
        }</span>,<br><br>We hebben gemerkt dat je je wachtwoord bent vergeten voor je account bij <span style="color:#F44336">Frituur Heidi</span>. Geen zorgen, we kunnen je helpen om je wachtwoord opnieuw in te stellen, zodat je snel weer toegang hebt tot je account. <br><br>Als je deze wachtwoord reset aanvraag niet hebt gedaan, dan kun je deze e-mail negeren. Maak je geen zorgen, je account is veilig en er zijn geen wijzigingen doorgevoerd. <br><br>Als je wel je wachtwoord wilt resetten, klik dan op de onderstaande knop om naar de resetpagina te gaan: </td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#D0D5D6"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table bgcolor="#EFEFEF" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style="padding: 25px;font-size:0;text-align:center"> <table class="btn_table" cellpadding="0" cellspacing="0" border="0" role="presentation" style="display:inline-block;"> <tr> <td class="btn_td" bgcolor="#FEBD00" style="padding:15px;text-align:center;font-family: 'Roboto Slab', serif !important; font-size: 15px; mso-line-height-rule: exactly; line-height: 20px;max-height: 999999px; color:#1B1B1E;"> <a class="btn" href="${link}" target="_blank" rel="noopener noreferrer" style="color:#1B1B1E;text-decoration:none;">Wachtwoord resetten</a></td> </tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#D0D5D6"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table bgcolor="#EFEFEF" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style="padding: 25px;"> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style="text-align:left; font-family: 'Roboto Slab', serif !important; font-size:16px; mso-line-height-rule:exactly; line-height:20px; color:#1B1B1E;max-height: 999999px; word-wrap: break-word; word-break: break-word;text-align:left;" align="center"> Als de knop niet werkt, kun je de volgende link in je webbrowser kopiëren en plakken:<br><br><a href="${link}" style="color:#F44336">${link}</a> <br><br>Volg daarna de instructies op de resetpagina om een nieuw wachtwoord in te stellen. Zorg ervoor dat je een sterk wachtwoord kiest met een combinatie van letters, cijfers en symbolen. <br><br>Als je hulp nodig hebt of vragen hebt, neem dan gerust contact met ons via de volgende manieren: <br><br><ul> <li>Telefoonisch op het nummer: <a style="color:#F44336" href="tel:+32 456 01 52 97">+32 456 01 52 97</a></li><li>Via ons mail op: <a style="color:#F44336" href="mailto:info@frituurheidi.com">info@frituurheidi.com</a></li></ul> <br>Met vriendelijke groet,<br>Heidi en het Team! </td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> </body> </html> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#D0D5D6"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table bgcolor="#1B1B1E" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style="padding: 25px;"> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style="text-align:left; font-family: 'Roboto Slab', serif !important; font-size:16px; mso-line-height-rule:exactly; line-height:20px; color:#EFEFEF;max-height: 999999px; word-wrap: break-word; word-break: break-word;text-align:center;" align="center"> Kazernelaan 124, Houthalen-Helchteren, 3530, België </td></tr><td class="m_hide" style="font-size:0;line-height:5px;height:5px;" height="5">&nbsp;</td><tr> <td> <table> <tr> <td style="text-align:left; font-family: 'Roboto Slab', serif !important; font-size:16px; mso-line-height-rule:exactly; line-height:20px; color:#EFEFEF;max-height: 999999px; word-wrap: break-word; word-break: break-word;text-align:center;" align="center"> <a style="color:#EFEFEF;text-decoration: underline;font-size: 12px;" href=process.env.NEXT_PUBLIC_DOMAIN_API+"/mails/unsubscribe">Uitschrijven</a> | <a style="color:#EFEFEF;text-decoration: underline;font-size: 12px;" href=process.env.NEXT_PUBLIC_DOMAIN_API+"/privacy">Privacybeleid</a> </td></tr><td class="m_hide" style="font-size:0;line-height:5px;height:5px;" height="5">&nbsp;</td><tr> <td style="text-align:left; font-family: 'Roboto Slab', serif !important; font-size:12px; mso-line-height-rule:exactly; line-height:20px; color:#EFEFEF;max-height: 999999px; word-wrap: break-word; word-break: break-word;text-align:center;" align="center">Copyright &copy; 2023 Frituur Heidi. Alle rechten voorbehouden.</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td> <table border="0" cellspacing="0" cellpadding="0" width="100%"> <tr> <td style="font-size:0;line-height:1px;height:17px;" height="17">&nbsp;</td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" bgcolor="#EFEFEF"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table bgcolor="#EFEFEF" cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td style=""> <table border="0" cellspacing="0" cellpadding="0" width="100%"> <tr> <td style="font-size:0;line-height:1px;height:3px;" height="3">&nbsp;</td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td><td class="m_wrapper" style="width:600px;"> <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation"> <tr> <td> <table border="0" cellspacing="0" cellpadding="0" width="100%"> <tr> <td style="font-size:0;line-height:1px;height:20px;" height="20">&nbsp;</td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> <table> <tr> <td style="font-family: 'Roboto Slab', serif !important; font-size:12px; mso-line-height-rule:exactly; line-height:20px; color:#EFEFEF;max-height: 999999px; word-wrap: break-word; word-break: break-word;text-align:left;" align="left"> Design by <a href="https://geysels.com/" style="text-decoration: underline;color:#EFEFEF">Geysels IT</a> </td></tr></table> </td></tr></table> </td></tr></table> </td><td class="m_hide" style="font-size:0;line-height:1px;height:1px;" height="1">&nbsp;</td></tr></table> </body> </html> `,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          res.json({ message: "Email not sent", error: err });
        } else {
          console.log(info);
          res.json({ message: "Email sent" });
        }
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
