// Coupon mail
const generalFormat = function (dataObj) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>[SUBJECT]</title>
  <style type="text/css">
  body {
   padding-top: 0 !important;
   padding-bottom: 0 !important;
   padding-top: 0 !important;
   padding-bottom: 0 !important;
   margin:0 !important;
   width: 100% !important;
   -webkit-text-size-adjust: 100% !important;
   -ms-text-size-adjust: 100% !important;
   -webkit-font-smoothing: antialiased !important;
 }
 .tableContent img {
   border: 0 !important;
   display: block !important;
   outline: none !important;
 }

p, h2{
  margin:0;
}

div,p,ul,h2,h2{
  margin:0;
}

h2.bigger,h2.bigger{
  font-size: 32px;
  font-weight: normal;
}

h2.big,h2.big{
  font-size: 21px;
  font-weight: normal;
}

a.link-content{
  color:#1B2147;
}
.bgBody{
background: #F6F6F6;
}
.bgItem{
background: #ffffff;
}

@media only screen and (max-width:480px)
		
{
		
table[class="MainContainer"], td[class="cell"] 
	{
		width: 100% !important;
		height:auto !important; 
	}
td[class="specbundle"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		
	}
	td[class="specbundle1"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:20px !important;
		
	}	
td[class="specbundle2"] 
	{
		width:90% !important;
		float:left !important;
		font-size:14px !important;
		line-height:18px !important;
		display:block !important;
		padding-left:5% !important;
		padding-right:5% !important;
	}
	td[class="specbundle3"] 
	{
		width:90% !important;
		float:left !important;
		font-size:14px !important;
		line-height:18px !important;
		display:block !important;
		padding-left:5% !important;
		padding-right:5% !important;
		padding-bottom:20px !important;
		text-align:center !important;
	}
	td[class="specbundle4"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:20px !important;
		text-align:center !important;
		
	}
		
td[class="spechide"] 
	{
		display:none !important;
	}
	    img[class="banner"] 
	{
	          width: 100% !important;
	          height: auto !important;
	}
		td[class="left_pad"] 
	{
			padding-left:15px !important;
			padding-right:15px !important;
	}
		 
}
	
@media only screen and (max-width:540px) 

{
		
table[class="MainContainer"], td[class="cell"] 
	{
		width: 100% !important;
		height:auto !important; 
	}
td[class="specbundle"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		
	}
	td[class="specbundle1"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:20px !important;
		
	}		
td[class="specbundle2"] 
	{
		width:90% !important;
		float:left !important;
		font-size:14px !important;
		line-height:18px !important;
		display:block !important;
		padding-left:5% !important;
		padding-right:5% !important;
	}
	td[class="specbundle3"] 
	{
		width:90% !important;
		float:left !important;
		font-size:14px !important;
		line-height:18px !important;
		display:block !important;
		padding-left:5% !important;
		padding-right:5% !important;
		padding-bottom:20px !important;
		text-align:center !important;
	}
	td[class="specbundle4"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:20px !important;
		text-align:center !important;
		
	}
		
td[class="spechide"] 
	{
		display:none !important;
	}
	    img[class="banner"] 
	{
	          width: 100% !important;
	          height: auto !important;
	}
		td[class="left_pad"] 
	{
			padding-left:15px !important;
			padding-right:15px !important;
	}
		
	.font{
		font-size:15px !important;
		line-height:19px !important;
		
		}
}

</style>
<script type="colorScheme" class="swatch active">
  {
    "name":"Default",
    "bgBody":"F6F6F6",
    "link":"62A9D2",
    "color":"999999",
    "bgItem":"ffffff",
    "title":"555555"
  }
</script>

</head>
<body paddingwidth="0" paddingheight="0"   style="padding-top: 0; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0" style="margin-left:5px; margin-right:5px; margin-top:0px; margin-bottom:0px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center"  style='font-family:helvetica, sans-serif;'>
    
  <tbody>
  <tr>
      <td height='35' bgcolor='#1B2147' colspan='3'></td>
    </tr>
    <tr>
      <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td valign="top" class="spechide"><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td height='200' bgcolor='#1B2147'>&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>
</td>
      <td valign="top" width="600"><table width="600" border="0" cellspacing="0" cellpadding="0" align="center" class="MainContainer" bgcolor="#ffffff">
  <tbody>
    <tr>
      <td class='movableContentContainer'>
      		<div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
            	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" valign='top'>
                  <tr>
                    <td bgcolor='#1B2147' valign='top'>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" valign='top'>
                        <tr>
                          <td align='center' valign='middle' >
                            <div class="contentEditableContainer contentImageEditable">
                              <div class="contentEditable" >
                                <h2 style='font-size:52px; color: white'>${dataObj.heading}</h2>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
            </div>
            <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
            	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" valign='top'>
                  <tr><td height='25' bgcolor='#1B2147'></td></tr>


                <tr>
                  <td align='center' valign='middle' height='115' class='bgItem'>
                    <div style="background-color: #FFFFFF" class="contentEditable">
                        <img class="banner" src="https://docmachine.in/assets/LogoFinal.png" alt='What we do' data-default="placeholder" data-max-width="200" width='200' height='80' >
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" valign='top' class='bgItem'>
                    
                      <tr>
                        <td align='left' width='530' style="padding-bottom: 6px">
                          <div style="-webkit-box-shadow: 0px 3px 9px -1px rgba(82,82,82,0.78);-moz-box-shadow: 0px 3px 9px -1px rgba(82,82,82,0.78);box-shadow: 0px 3px 9px -1px rgba(82,82,82,0.78);color: #1B2147;line-height: 1.5;font-size: 20px; padding: 20px; border-radius: 4px;">
                            <div>
                              ${dataObj.html}
                              <div>
                                <p>Kind Regards</p>
                                <p style="font-weight: bold">DocMachine</p>
                                <p><a target='_blank' href="${dataObj.host}">http://localhost:4200/</a></p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
                </table>
            </div>
          
  
            <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
            	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" valign='top' class='bgBody' >
                 

                  <tr><td height='28'></td></tr>

                  <tr>
                    <td valign='top' align='center'>
                      <div class="contentEditableContainer contentTextEditable">
                        <div class="contentEditable" style='color:#A8B0B6; font-size:18px;line-height: 29px;'>
                          
                          <p style="font-size: 16px"> Copyright &copy; 2020 <a href="${dataObj.host}" style='color:#A8B0B6; text-decoration: none;' target="_blank">DocMachine Ltd.</a> All rights reserved
                          </p>
                          <p style="font-size: 16px"><a href="${dataObj.host}/subscription-terms-and-conditions" style='color:#A8B0B6; text-decoration: none;' target="_blank"> Terms & Conditions &nbsp;&nbsp;</a><a href="${dataObj.host}/privacy-policy" style='color:#A8B0B6; text-decoration: none;' target="_blank"> Privacy Policy </a>
                          </p><br/>
                        </div>
                      </div>
                      </td>
                    </tr>

                    <tr><td height='28'></td></tr>
                </table>
            </div>
      
      </td>
    </tr>
  </tbody>
</table>
</td>
      <td valign="top" class="spechide"><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td height='200' bgcolor='#1B2147'>&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>
</td>
    </tr>
  </tbody>
</table>
</td>
    </tr>
  </tbody>
</table>

  </body>
  </html>
`
}

const purchaseFormat = function (dataObj) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>[SUBJECT]</title>
  <style type="text/css">
  body {
   padding-top: 0 !important;
   padding-bottom: 0 !important;
   padding-top: 0 !important;
   padding-bottom: 0 !important;
   margin:0 !important;
   width: 100% !important;
   -webkit-text-size-adjust: 100% !important;
   -ms-text-size-adjust: 100% !important;
   -webkit-font-smoothing: antialiased !important;
 }
 .tableContent img {
   border: 0 !important;
   display: block !important;
   outline: none !important;
 }

p, h2{
  margin:0;
}

div,p,ul,h2,h2{
  margin:0;
}

h2.bigger,h2.bigger{
  font-size: 32px;
  font-weight: normal;
}

h2.big,h2.big{
  font-size: 21px;
  font-weight: normal;
}

a.link-content{
  color:#1B2147;
}
.bgBody{
background: #F6F6F6;
}
.bgItem{
background: #ffffff;
}

@media only screen and (max-width:480px)
		
{
		
table[class="MainContainer"], td[class="cell"] 
	{
		width: 100% !important;
		height:auto !important; 
	}
td[class="specbundle"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		
	}
	td[class="specbundle1"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:20px !important;
		
	}	
td[class="specbundle2"] 
	{
		width:90% !important;
		float:left !important;
		font-size:14px !important;
		line-height:18px !important;
		display:block !important;
		padding-left:5% !important;
		padding-right:5% !important;
	}
	td[class="specbundle3"] 
	{
		width:90% !important;
		float:left !important;
		font-size:14px !important;
		line-height:18px !important;
		display:block !important;
		padding-left:5% !important;
		padding-right:5% !important;
		padding-bottom:20px !important;
		text-align:center !important;
	}
	td[class="specbundle4"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:20px !important;
		text-align:center !important;
		
	}
		
td[class="spechide"] 
	{
		display:none !important;
	}
	    img[class="banner"] 
	{
	          width: 100% !important;
	          height: auto !important;
	}
		td[class="left_pad"] 
	{
			padding-left:15px !important;
			padding-right:15px !important;
	}
		 
}
	
@media only screen and (max-width:540px) 

{
		
table[class="MainContainer"], td[class="cell"] 
	{
		width: 100% !important;
		height:auto !important; 
	}
td[class="specbundle"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		
	}
	td[class="specbundle1"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:20px !important;
		
	}		
td[class="specbundle2"] 
	{
		width:90% !important;
		float:left !important;
		font-size:14px !important;
		line-height:18px !important;
		display:block !important;
		padding-left:5% !important;
		padding-right:5% !important;
	}
	td[class="specbundle3"] 
	{
		width:90% !important;
		float:left !important;
		font-size:14px !important;
		line-height:18px !important;
		display:block !important;
		padding-left:5% !important;
		padding-right:5% !important;
		padding-bottom:20px !important;
		text-align:center !important;
	}
	td[class="specbundle4"] 
	{
		width: 100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:20px !important;
		text-align:center !important;
		
	}
		
td[class="spechide"] 
	{
		display:none !important;
	}
	    img[class="banner"] 
	{
	          width: 100% !important;
	          height: auto !important;
	}
		td[class="left_pad"] 
	{
			padding-left:15px !important;
			padding-right:15px !important;
	}
		
	.font{
		font-size:15px !important;
		line-height:19px !important;
		
		}
}

.main-content-text {
  color: #1B2147;line-height: 1.5;font-size: 20px; padding: 20px; border-radius: 4px
}

.box-shadow {
-webkit-box-shadow: 0px 3px 9px -1px rgba(82,82,82,0.78);
-moz-box-shadow: 0px 3px 9px -1px rgba(82,82,82,0.78);
box-shadow: 0px 3px 9px -1px rgba(82,82,82,0.78);
}

.topBanner {
  font-size: 12px;
  text-decoration: none;
  background: transparent;
  width: 10%;
  height: 113%;
  padding: 0 12% 3% 3%;
  line-height: 23px;
}

.topBanner .icon {
  width: 60px;
  height: 82px;
  background: url(https://s3.eu-west-2.amazonaws.com/d8amatiks/admin/images/bgstar.png) no-repeat;
}


</style>
<script type="colorScheme" class="swatch active">
  {
    "name":"Default",
    "bgBody":"F6F6F6",
    "link":"62A9D2",
    "color":"999999",
    "bgItem":"ffffff",
    "title":"555555"
  }
</script>

</head>
<body paddingwidth="0" paddingheight="0"   style="padding-top: 0; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0" style="margin-left:5px; margin-right:5px; margin-top:0px; margin-bottom:0px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center"  style='font-family:helvetica, sans-serif;'>
  
    <!--  =========================== The header ===========================  -->   
    
  <tbody>
  <tr>
      <td height="10" bgcolor="#F6F6F6" colspan="3"></td>
    </tr>
    <tr>
      <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td valign="top" class="spechide"><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td height="200" bgcolor="#F6F6F6">&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>
</td>
      <td valign="top" width="600"><table width="600" border="0" cellspacing="0" cellpadding="0" align="center" class="MainContainer" bgcolor="#ffffff">
  <tbody>
   <!--  =========================== The body ===========================  -->   
    <tr>
      <td class='movableContentContainer'>
      		
            <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
            	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" valign='top'>
                 
                <tr>
                  <td align='center' valign='middle' height='115' class='bgItem'>
                    <div style="background-color: #F6F6F6" class="contentEditable">
                        <img class="banner" src="https://s3.eu-west-2.amazonaws.com/d8amatiks/admin/images/Email+temp+logo.png" alt='What we do' data-default="placeholder" data-max-width="200" width='200' height='115' >
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" valign='top' class='bgItem'>
                    <tr><td align='center' valign='middle' height='150' bgcolor='#1B2147'>
                        <table height="100%" width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                            <tr>
                              <td width="80%" style="padding-right: 10%" align='right' bgcolor='#1B2147'><h2 style='font-size:52px; color: white'>${dataObj.plan}</h2></td>
                              <td width="20%" align='left' bgcolor='#1B2147'>
                                <div class="topBanner">
                                  <div class="icon">
                                    &nbsp;
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table></td></tr>
                      <tr>
                        <td align='left' width='530' style="padding-bottom: 6px">
                          <div class="main-content-text box-shadow">
                            <div>
                              ${dataObj.html}
                              <div>
                                <p>Kind Regards</p>
                                <p style="font-weight: bold">Wrked Team</p>
                                <p><a target='_blank' href="${dataObj.host}">Wrked.com</a></p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
                </table>
            </div>
          
  
            <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
            	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" valign='top' class='bgBody' >
                 

                  <tr><td height='28'></td></tr>

                  <tr>
                    <td valign='top' align='center'>
                      <div class="contentEditableContainer contentTextEditable">
                        <div class="contentEditable" style='color:#A8B0B6; font-size:18px;line-height: 29px;'>
                          ${dataObj.firstFooter}
                          <p style="font-size: 16px"> Copyright &copy; 2020 <a href="${dataObj.host}" style='color:#A8B0B6; text-decoration: none;' target="_blank">DocMachine Ltd.</a> All rights reserved
                          </p>
                          <p style="font-size: 16px"><a href="${dataObj.host}/#/subscription-terms-and-conditions" style='color:#A8B0B6; text-decoration: none;' target="_blank"> Terms & Conditions &nbsp;&nbsp;</a><a href="${dataObj.host}/#/privacy-policy" style='color:#A8B0B6; text-decoration: none;' target="_blank"> Privacy Policy </a>
                          </p><br/>
                        </div>
                      </div>
                      </td>
                    </tr>

                    <tr><td height='28'></td></tr>
                </table>
            </div>
      
      </td>
    </tr>
  </tbody>
</table>
</td>
      <td valign="top" class="spechide"><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td height='200' bgcolor='#F6F6F6'>&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>
</td>
    </tr>
  </tbody>
</table>
</td>
    </tr>
  </tbody>
</table>

  </body>
  </html>
`
}

const emailButton = function (buttonData) {
  if (buttonData.link && buttonData.text) {
    return `<div style="text-align: center;min-height: 60px;"><a href="${buttonData.link}" style="background: #1B2147;color: white;padding: 16px 20px;border-radius: 4px;font-weight: bold; text-decoration: none;">${buttonData.text}</a></div>`
  }
}

const emailLink = function (linkData) {
  if (linkData.link && linkData.text) {
    return `<a target='_blank' class='link-content' href="${linkData.link}" >${linkData.text}</a>`
  }
}
module.exports = {
  generalFormat: generalFormat,
  emailButton: emailButton,
  emailLink: emailLink,
  purchaseFormat: purchaseFormat
}
