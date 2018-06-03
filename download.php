<?php

  if(!empty($_GET['file'])){
     $fileName=basename($_GET['file']);
	 $filePath='files/'.$fileName;
	 if(!empty($fileName) && file_exists($filePath)){
	    // Define Headers
		  header("Cache-Control:public");
		  header("Content-Description: File Transfer");
		  header("Content-Disposition:attachment:filename=$fileName");
		  header("Content-Type: application/zip");
		  header("Content-Transfer-Encoding: binary");
		  //read the files
		  readfile($filePath);
		  exit;
		  }
		  }
		  ?>
	 