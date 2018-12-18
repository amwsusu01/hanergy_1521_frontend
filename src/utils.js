//下载excel
export function exportExl(res,name) {
	if(!res) return;
	 //let fileName =  decodeURI(res.headers['content-disposition'].split('=')[1]),
	//let filename =  '导出职位.xls',
	let filename = res.headers && res.headers['content-disposition']?decodeURI(res.headers['content-disposition'].split("filename=")[1]):'',
	//let filename = '导出职位.xls',
	blob = res.data;
	if(filename == '')
		filename  = name ? name :'导出明细.xlsx';
	//blob = new Blob([res.data], {type: mime || 'application/octet-stream'});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were 
        // revoked by closing the blob for which they were created. 
        // These URLs will no longer resolve as the data backing 
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename); 
        
        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking 
        // is enabled.
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}

export function getMaxFreq(maxNum) {
    if(maxNum >= 5000) return 50;
     else if(maxNum < 5000) return 25;

     //待定
     else if(maxNum < 2500 && maxNum >= 1000) return 15;
     else if(maxNum < 1000) return 8;
     else return 5;
}