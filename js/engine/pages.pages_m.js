
//function clickprv(){




//                    storage.put("prv_id", "1");
//                    storage.put("prv_name", "МТС");
//                    storage.put("prv_logo", "./img/ui_item/1.gif");


//                   
////                    storage.put("provider", "1");
////                    		var sNumber = storage.get("0");

////var sLang = storage.get("language"); 
//getScript("./config/F1/1.js"); 
//top.location.href = "./redirect_top_prv.html";	


////var sLang = storage.get("language"); 
////getScript("./config/" + sLang + "/"  + "3" + ".js", this._prvLoaded, [], this);
////this._clickprv();
//}	

	CPagesPage = createClass
(
    CPage,
    {
        ctor: function(oParent, sInstance, sCtrlPlace, sGroup, aGroups) {
            CPagesPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
            if(sGroup == "-161")
            {
            	top.location.href = 'bank.html';
            	return;
            }
            this._dataProvider = new CJsDataProvider(this, "_dataProvider");
            this._dataProvider._aGroups = aGroups;
            if (this._dataProvider.isEmptyGroup(sGroup)) {
                top.location.href = "./index.html";
                return;
            }
            this._js = null;
            this._sEntranceGroup = sGroup;
            this._sGroup = sGroup;
            this._aStek = new Array();
            this._bIsDataLoaded = true;
            this._aGroup = this._dataProvider.getElementsByGroup(this._sGroup);
            this._nCurrentStr = 1;
            this._nFinalStr = Math.ceil(this._aGroup.length / 16);
            if (/^\d+$/.test(this._aGroup.length / 16))
                this._nFinalStr--;
        },
        
        
        
        	    _clickGroup: function(prvId, hash) {
	        top.storage.put("group", prvId);

	        var group = null;
	        for (var i = 0, l = this._aGroups.length; i < l; i++) {
	            if (this._aGroups[i].id == prvId) {
	                group = this._aGroups[i];
	                break;
	            }
	        }

		    if (group && group.tag.indexOf('ranges') > -1) {
		        top.storage.put("provider", "null");
		        top.storage.put("last_page", document.location.href);
		        top.location.href = "./cellular.html";
	        }
//	        else if (group && group.tag.indexOf('promo') > -1) {
//	            top.storage.put("last_page", document.location.href);
//	            top.location.href = "./qiwi_promo.html";
//	        }
//	        else if (group && group.tag.indexOf('lottery') > -1) {
//	            top.storage.put("last_page", document.location.href);
//	            top.location.href = "./loto_index.html";
//	        }
	        else {
	            var h = hash;
	            setTimeout($delegate(this, function() {
	                this._loadGroup(prvId, group, h);
	            }), 25);
	           
	        }
	    },

	    _loadGroup: function(prvId, group, hash) {
var sLang = storage.get("language");
	        if (!group) group = {};
	        getScript("./config/" + sLang + "/" + prvId + ".js", function() {
	            group['__objects'] = window.UIGroup;
	            window.UIGroup = null;
	            getScript('./js/engine/pages.pages.js', function() {
	                var page = newObject(CPagesPage, null, null, null, "page", "content", prvId, this._aGroups);
	                page.render();
	                if (hash && hash.length > 3) {
	                    page._nCurrentStr = hash[3];
	                    page._contentManagement();
	                }
	            }, [], this);
	        }, [], this);
	        document.location.hash = '#' + prvId;
	    },

        _paint: function() {
            var oPlace = $(this.getPlaceId());
            if (!Object.isNullOrUndefined(oPlace)) {
                var oSound = document.createElement('bgsound');
                oSound.src = './sound/choose_operators.wav';
                oSound.loop = '1';
                oPlace.appendChild(oSound);
                oPlace.innerHTML =
                        '<div style="height: 18px"></div><table cellpadding="0" cellspacing="0" border="0" width="100%" height="180">' +
                        '  <tr valign="middle">' +
                        '    <td width="162" height="180">' +
                         '        <div style="position:absolute; width: 139px; height: 180px; margin: -80px 0px 0px 20px;"><img alt="" src="./img/ui/EasyPay-logo.png" /></div>'+
                        '    </td>' +
                        '    <td width="1090" height="180">' +
                        //'        <div id="advert_1" style="width: 1090px; height: 180px; margin-left: 5px; overflow: hidden;"></div>' +


                                                                        ' <div  style="width: 1090px; height: 180px; margin-left: 7px; overflow: hidden; display: block;">' +
                        	                        '           <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="100%" height="100%">' +
                            '               <param name="allowScriptAccess" value="sameDomain" />' +
                            //'               <param name="movie" value="./swf/banner.swf" />' +
                            '               <param name="quality" value="best" />' +
                            '               <param name="wmode" value="transparent" />' +
                            '           </object>' +
                            '</div>' +


                        '    </td>' +
                        '  </tr>' +
                        '</table>' +
                        '<div id="' + this._sInstance + '_page_body" class="page_body"></div>' +
    	                '<div id="' + this._sInstance + '_bottom_menu">';
                startAdvert("Pages");
                this._createBottomMenu(this._sInstance + "_bottom_menu");
                this._createContent(this._sInstance + "_page_body");
            }
        },

        _createBottomMenu: function(sPlace) {
        
        	        var sLang = storage.get("language");
	        if (!sLang || sLang == "null") {
	            sLang = "F1";

	        }

	        if (sLang == "F1") {
            CPagesPage.base._createBottomMenu.apply(this, arguments);
            this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "next_F1.gif", "next_press_F1.gif");
            this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "back_F1.gif", "back_press_F1.gif");
            this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu_F1.gif", "menu_press_F1.gif");
            //            this._oLeftBtmBtn.setKeyCode("left4");
            this._oLeftBtmBtn.render();
            this._oCenterBtmBtn.render();
            this._oRightBtmBtn.render();
            this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._backButtonClick));
            this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
            this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._nextButtonClick));
            
            }
            else{
                        CPagesPage.base._createBottomMenu.apply(this, arguments);
            this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "next_FC.gif", "next_press_FC.gif");
            this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "back_FC.gif", "back_press_FC.gif");
            this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu_FC.gif", "menu_press_FC.gif");
            //            this._oLeftBtmBtn.setKeyCode("left4");
            this._oLeftBtmBtn.render();
            this._oCenterBtmBtn.render();
            this._oRightBtmBtn.render();
            this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._backButtonClick));
            this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
            this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._nextButtonClick));
            
            }
            
        },

        _createContent: function(sPlace) {
            if (!this._bIsDataLoaded) {
                $(sPlace).innerHTML =
                '<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; height: 100%;">' +
                '  <tr>' +
                '    <td id="' + (this._sInstance + "_content") + '" align="center" valign="middle" style="width: 100%; height: 100%;">Идет загрузка данных</td>' +
                '  </tr>' +
                '</table>';
            }
            else {
                $(sPlace).vAlign = "top";
                $(sPlace).innerHTML =
	                '<div style="height: 18px"></div><div style="width: 1241px; height: 121px; margin: 0; position: relative; left: 20px">' +
	                '   <div id="' + this._sInstance + '_groups" style="width: 930px; height: 121px; float: right;"></div>' +
	                '   <div id="' + this._sInstance + '_search" style="width: 301px; height: 121px; float: left;">' +
	                '   </div>' +
	                '</div>' +
    	            '<div id="' + this._sInstance + '_elements" style="width: 1241px; height: 495px; margin: 15px 0 0; position: relative; left: 20px"></div>';
                this._drawSearchButton(this._sInstance + "_search");
                this._contentManagement('group');
            }
        },

        _drawSearchButton: function(sPlace) {
         var sLang = storage.get("language"); 
            var oBtn = new CImageButton(this, "search_btn", sPlace, "SEARCH", "./img/ui/navigation/2btnorange_unpress" + this._sGroup + "_" + sLang + ".gif", "./img/ui/navigation/2btnorange_unpress" + this._sGroup + "_" + sLang + ".gif"); // Отображение выбранной страны при выборе категорий
//            oBtn.attachListener("onClick", $delegate(this, this._searchButtonClick));
            oBtn.create();
            oBtn.render();
        },

        _searchButtonClick: function() {
            if (this._aStek.length == 0)
                top.storage.put("nCurrentStr", this._nCurrentStr.toString());
		    var path = document.location.pathname.match(/([^\\^//]+)$/)[1];
		    top.location.href = "./search_providers.html#" + path + document.location.hash;
        },

        _contentManagement: function(sComand) {
            switch (sComand) {
                case 'group':
                    this._aGroup = this._dataProvider.getElementsByGroup(this._sGroup);
                    this._nFinalStr = Math.ceil(this._aGroup.length / 16);
                    var temp = storage.get("nCurrentStr");
                    storage.remove("nCurrentStr");
                    if (temp != null)
                        this._nCurrentStr = parseInt(temp, 10);
                    else
                        this._nCurrentStr = 1;
                    if (this._nCurrentStr == this._nFinalStr)
                        this._oRightBtmBtn.setEnabled(false);
                    break;
                    

                    
                    
                    
                case 'forward':
                    if (this._nCurrentStr >= this._nFinalStr)
                        this._oRightBtmBtn.setEnabled(false);
                    break;
                case 'backward':
                    if (this._nCurrentStr > 1) {
                        this._nCurrentStr--;
                        if (this._nCurrentStr < this._nFinalStr)
                            this._oRightBtmBtn.setEnabled(true);
                    }
                    else {
                        this._sGroup = this._aStek.pop();
                        
                        this._aGroup = this._dataProvider.getElementsByGroup(this._sGroup);
                        this._nFinalStr = Math.ceil(this._aGroup.length / 16);
                        if (this._nCurrentStr < this._nFinalStr)
                            this._oRightBtmBtn.setEnabled(true);
                        if (/^\d+$/.test(this._aGroup.length / 16))
                            this._nFinalStr--;
                        this._nCurrentStr = 1;
                    }
                    $(this._sInstance + '_page_body').style.display = 'block';
                    break;
            }
            this._drawGroup(this._sInstance + "_groups");
            this._drawElements(this._sInstance + "_elements");

		var hash = getHash();
		if(!$isNoU(hash) && this._sGroup != hash[1]) return;

            document.location.hash = '#' + this._sGroup + ':' + this._nCurrentStr;
        },

        _drawElements: function(sPlace) {
            var inst = this._sInstance,
                sPlace = $(sPlace);

            for(var i = sPlace.childNodes.length; i > 0; i--)
            {
            	discardElement(sPlace.childNodes[i - 1]);
            }
            for(var i = (this._nCurrentStr - 1) * 16, l = (this._nCurrentStr - 1) * 16 + 16; i < l; i++)
            {
                if(i < this._aGroup.length)
                {
                    //var oTemp = this._aGroup[i].elementValue;
                    sPlace.innerHTML += ['<div class="element-place">',
                    	'<div id="', inst, "_element_", (i + 1), '"></div>',
                    	'</div>'
                    ].join('');
                }
            }
            this._createElements();
        },

        _createElements: function() {
            for(var i = (this._nCurrentStr - 1) * 16; i < (this._nCurrentStr - 1) * 16 + 16; i++)
            {
                var oPlace = $(this._sInstance + "_element_" + (i + 1));
                if(oPlace)
                {
                    var oElement = new CElementButton(this, "el" + (i + 1),
	                            oPlace.id,
	                            ((this._aGroup[i].elementType == "GROUP") ?
			                    (this._aGroup[i].elementValue.id) :
			                    this._aGroup[i].elementValue.id),
	                            ((this._aGroup[i].elementType == "PROVIDER") ?
			                    (this._aGroup[i].elementValue.buttonName || this._aGroup[i].elementValue.sName) :
			                    this._aGroup[i].elementValue.name),
	                            this._aGroup[i].elementValue.logo);
                    oElement.attachListener("onClick", $delegate(this, this._elementClick));
                    oElement.render();
                }
            }
        },
        
        
        	          _clickprv: function()
 { 
// var sLang = storage.get("language"); 
//getScript("./config/" + sLang + "/"  + "3" + ".js", this._prvLoaded, [], this);
top.location.href = "./index.html";
 },
        

        _drawGroup: function(sPlace) {
    
        var sLang = storage.get("language");
            var sContent = '';
            var sId = this._dataProvider.getHighLevelGroup(this._sGroup);
            var oTemp = this._dataProvider.getGroupById(sId == '' ? this._sGroup : sId);
            

 
// if (this._dataProvider.getGroupById(this._sGroup).id == -100001)
// 
//            sContent = '<table  cellpadding="0" cellspacing="0" border="0">' +  // Вывод Топ-5 Россия
//	                   '    <tr>' +
//	                   '        <td class="section-holder-top">' +

//	                   '            <div class="section-icon" style=" width:100px; position:-30px"></div>' +
//	                   '            <div onclick="clickprv1();" class="section-icon" style="width:150px;  background: url(\'./img/ui_item/1.gif\') no-repeat; background-position:2px" ></div>' +
//	                   '            <div onclick="clickprv2();" class="section-icon" style="background: url(\'./img/ui_item/' + "2.gif" + '\') no-repeat; background-position:6px" ></div>' +
//	                   '            <div onclick="clickprv3();" class="section-icon" style="background: url(\'./img/ui_item/' + "3.gif" + '\') no-repeat; background-position:18px"></div>' +
//	                   '            <div onclick="clickprv410();" class="section-icon" style="background: url(\'./img/ui_item/' + "410.gif" + '\') no-repeat; background-position:30px"></div>' +
//	                   '            <div onclick="clickprv383();" class="section-icon" style="background: url(\'./img/ui_item/' + "383.gif" + '\') no-repeat; background-position:40px"></div>'; 
//	                   
//	                   else
//	                   
//	                   if (this._dataProvider.getGroupById(this._sGroup).id == -100002)
// 
//            sContent = '<table cellpadding="0" cellspacing="0" border="0">' +  // Вывод Топ-5 Украина
//	                   '    <tr>' +
//	                   '        <td class="section-holder-top">' +
//	                   '            <div class="section-icon" style=" width:100px; position:-30px"></div>' +
//	                   '            <div onclick="clickprv7365();" class="section-icon" style="  background: url(\'./img/ui_item/158.gif\') no-repeat;background-position:2px" ></div>' +
//	                   '            <div onclick="clickprv7366();" class="section-icon" style="background: url(\'./img/ui_item/' + "1.gif" + '\') no-repeat;background-position:15px" ></div>' +
//	                   '            <div onclick="clickprv7368();" class="section-icon" style="background: url(\'./img/ui_item/' + "301.gif" + '\') no-repeat;background-position:25px"></div>' +
//	                   '            <div onclick="clickprv7364();" class="section-icon" style="background: url(\'./img/ui_item/' + "5069.gif" + '\') no-repeat; background-position:35px"></div>' +
//	                   '            <div onclick="clickprv7369();" class="section-icon" style="background: url(\'./img/ui_item/' + "437.gif" + '\') no-repeat;background-position:50px"></div>'; 
//	                   
//	                    else
//	                   
//	                   if (this._dataProvider.getGroupById(this._sGroup).id == -100003)
// 
//            sContent = '<table cellpadding="0" cellspacing="0" border="0">' +  // Вывод Топ-5 Молдова
//	                   '    <tr>' +
//	                   '        <td class="section-holder-top">' +
//	                   '            <div class="section-icon" style=" width:100px; position:-30px"></div>' +
//	                   '            <div onclick="clickprv765();" class="section-icon" style="  background: url(\'./img/ui_item/765.gif\') no-repeat;background-position:2px" ></div>' +
//	                   '            <div onclick="clickprv763();" class="section-icon" style="background: url(\'./img/ui_item/' + "763.gif" + '\') no-repeat;background-position:15px" ></div>' +
//	                   '            <div onclick="clickprv2891();" class="section-icon" style="background: url(\'./img/ui_item/' + "2891.gif" + '\') no-repeat;background-position:25px"></div>' +
//	                   '            <div onclick="clickprv814();" class="section-icon" style="background: url(\'./img/ui_item/' + "814.gif" + '\') no-repeat; background-position:40px"></div>' +
//	                   '            <div onclick="clickprv858();" class="section-icon" style="background: url(\'./img/ui_item/' + "858.gif" + '\') no-repeat;background-position:50px"></div>'; 
//	                   
//	                    else
//	                   
//	                   if (this._dataProvider.getGroupById(this._sGroup).id == -100005)
// 
//            sContent = '<table cellpadding="0" cellspacing="0" border="0">' +  // Вывод Топ-5 Казахстан
//	                   '    <tr>' +
//	                   '        <td class="section-holder-top">' +
//	                   '            <div class="section-icon" style=" width:100px; position:-30px"></div>' +
//	                   '            <div onclick="clickprv644();" class="section-icon" style="  background: url(\'./img/ui_item/644.gif\') no-repeat;background-position:2px" ></div>' +
//	                   '            <div onclick="clickprv142();" class="section-icon" style="background: url(\'./img/ui_item/' + "142.gif" + '\') no-repeat;background-position:20px" ></div>' +
//	                   '            <div onclick="clickprv643();" class="section-icon" style="background: url(\'./img/ui_item/' + "643.gif" + '\') no-repeat;background-position:25px"></div>' +
//	                   '            <div onclick="clickprv240();" class="section-icon" style="background: url(\'./img/ui_item/' + "240.gif" + '\') no-repeat; background-position:35px"></div>' +
//	                   '            <div onclick="clickprv431();" class="section-icon" style="background: url(\'./img/ui_item/' + "431.gif" + '\') no-repeat;background-position:60px"></div>'; 
//	                   
//	                   
//	                    else
//	                   
//	                   if (this._dataProvider.getGroupById(this._sGroup).id == -100006)
// 
//            sContent = '<table cellpadding="0" cellspacing="0" border="0">' +  // Вывод Топ-5 Беларусь
//	                   '    <tr>' +
//	                   '        <td class="section-holder-top">' +
//	                   '            <div class="section-icon" style=" width:100px; position:-30px"></div>' +
//	                   '            <div onclick="clickprv844();" class="section-icon" style="  background: url(\'./img/ui_item/844.gif\') no-repeat;background-position:5px" ></div>' +
//	                   '            <div onclick="clickprv845();" class="section-icon" style="background: url(\'./img/ui_item/' + "845.gif" + '\') no-repeat;background-position:15px" ></div>' +
//	                   '            <div onclick="clickprv2208();" class="section-icon" style="background: url(\'./img/ui_item/' + "2208.gif" + '\') no-repeat;background-position:30px"></div>' +
//	                   '            <div onclick="clickprv1329();" class="section-icon" style="background: url(\'./img/ui_item/' + "1329.gif" + '\') no-repeat; background-position:40px"></div>' +
//	                   '            <div onclick="clickprv847();" class="section-icon" style="background: url(\'./img/ui_item/' + "847.gif" + '\') no-repeat;background-position:50px"></div>'; 
//	                   
//	                   
//	                   
//	                   else
	                   
	                               sContent = '<table cellpadding="0" cellspacing="0" border="0">' +
	                   '    <tr>' +
	                   '        <td class="section-holder">' 
	                   

	                   


	                   
	                   
	                   
	                   
	                   
            if ((this._nFinalStr != 1) &&
                (this._nCurrentStr <= this._nFinalStr)) {
                
                if (sLang == "F1"){
                
                sContent +=
	                '<div class="page-status">' + this._nCurrentStr + '<big>-я страница из </big>' + this._nFinalStr + '</div>';
	                }
	                else {
	                
	                
	                                sContent +=
//	                '<div class="page-status">' + this._nCurrentStr + '<big>-я stranica из </big>' + this._nFinalStr + '</div>';
                    '<div class="page-status">' + this._nCurrentStr + '<big> page of </big>' + this._nFinalStr + '<big></big></div>';
	                }
            }
            sContent +=  '       </td>' +
	                    '   </tr>' +
	                    '</table>';
            $(sPlace).innerHTML = sContent;
        },

        _menuButtonClick: function(sender, eargs) {
            top.location.href = "./index.html";
        },



        
//                    top.storage.put("provider", "null");
//                    top.location.href = "./main.html#-100001:1";
        _backButtonClick: function(sender, eargs)
        {
            $(this._sInstance + '_page_body').style.display = 'none';
            if(this._nCurrentStr == 1 && this._aStek.length == 0)
            {
                if(this._dataProvider.isCellularGroup(this._sGroup))
                {
                    storage.put("provider", "null");
                    document.location.href = "./cellular.html";
                }
                else
                {
                    top.location.href = "./main.html#-100001:1";
                    var page = newObject(CMainPage, null, null, null, "page", "content");
                    page.render();
                }
            }
            else
                this._contentManagement('backward');
        },

        _nextButtonClick: function() {
            this._nCurrentStr++;
            this._contentManagement('forward');
        },
        
        
        
        

        _elementClick: function CMainPage$_elementClick(sender, eargs) {

                var bFlag = false,
	            sFirstLwlGrpId = "0",
	            prvId = eargs.value;

//	        if (/^-\d+$/.test(prvId)) {
	            if (prvId == "-10000120" ) {
	                document.location.href = 'cellular.html';
	                return;
	            }
//	            this._clickGroup(prvId);
//	        }
//	        

        
            if (/^-\d+$/.test(eargs.value)) {
                this._aStek.push(this._sGroup);
                this._sGroup = eargs.value;
                this._nCurrentStr = 0;
                this._contentManagement('group');
                
            }
            else
                if (/^\d+$/.test(eargs.value)) {
                    this._clickProvider(eargs.value);
                    
                }
                
        },


	    
	    
	    
	    

        _clickProvider: function(sId) {
        var sLang = storage.get("language");
            if($is(sId, String))
            {
             
                getScript("./config/" + sLang + "/"  + sId + ".js", this._prvLoaded, [], this);
            }
            
            
        },
        
        _prvLoaded: function() {
            var oRes = null;
            try {
                oRes = window.UIProvider.clone();
                this._dataProvider.modifyProvider(oRes);
            }
            catch (e) {
                oRes = null;
            }
            this._processProvider(oRes);
        },
        
        _processProvider: function(oProvider) {
            if (!$isNoU(oProvider)) {
                top.storage.put("provider", oProvider["id"]);
                var oPayInfo = Object.deserialize(storage.get("pay_info"));
                

                if (!$isNoU(oPayInfo)) {
                    oPayInfo.prvId = oProvider.id;
                    oPayInfo.prvName = oProvider.buttonName || oProvider.sName;
                    oPayInfo.prvLogo = oProvider.logo;
                    oPayInfo.curId = oProvider.curId;  // Валюта
                    
//                    var bCelOnline = false;
//                    if (!$isNoU(authOnlineCellular))
//		                if (authOnlineCellular == true)
//		                    bCelOnline = true;
//		            if (bCelOnline)
//		            {
//		                var oForm = new CForm(this, "oForm", "./online_auth.html");
//		                oForm.put("_extra_auth_page", 'online_auth.html');
//		                oForm.put("_extra_auth_success", 'validate_confirm.html');
//		                oForm.put("_extra_auth_fail", 'online_auth_error.html');
//		            }
//		            else
                    var oForm = new CForm(this, "oForm", "./validate_confirm.html");
                    oForm.put("prv_id", oPayInfo.prvId);
                    oForm.put("prv_name", oPayInfo.prvName);
                    oForm.put("getAccountNumber", oPayInfo.account);
                  //  oForm.put("prv_cur_id", oPayInfo.curId);            // Передача валюты
                    oForm.put("prv_cur_id", '840');            // Передача валюты
                    if (!$isNoU(oProvider["maxSum"])) {
                        oForm.put("MaxCashLimit", oProvider["maxSum"]);
                    }
                    if (!$isNoU(oProvider["minSum"])) {
                        oForm.put("komissiya", oProvider["minSum"]);
                    }
                    else
                        oForm.put("komissiya", "1");
                    startAdvert("Pages");
                    top.storage.put("pay_info", oPayInfo.serialize());
                    top.storage.put("last_page", "main.html");
                    oForm.submit();
                }
                else 
                if (this._dataProvider.isCellularGroup(
                        this._dataProvider.getHighLevelGroup(oProvider["id"]))) {
                    top.storage.put("last_page", document.location.href);
                    top.location.href = "./cellular.html";
                }
                else 
                if (!$isNoU(oProvider["prvPage"]) &&
                    oProvider["prvPage"].is(String) &&
                    oProvider["prvPage"].length > 0) {
                    top.storage.put("last_page", document.location.href);
                    this._postData(oProvider["prvPage"], oProvider);
                }
                else if(oProvider.tag && oProvider.tag.indexOf('pin') > -1)
                {
                    top.storage.put("last_page", document.location.href);
                    top.location.href = "./p_eventis.html";
                }
                
                else if(oProvider.tag && oProvider.tag.indexOf('ranges') > -1)
                {
                storage.put("provider", "null");
                    top.storage.put("last_page", document.location.href);
                    top.location.href = "./cellular.html";
                }
                
 
                
                else {
                    top.storage.put("last_page", document.location.href);
                    top.location.href = "./provider.html";
                }
            }
        },

        _postData: function(sUrl, oPrv) {
          //  this._oPostData["prv_cur_id"] = this._oProvider.curId;
            this._oPostData["prv_cur_id"] = '643';
           // oForm.put("prv_cur_id", oPrv["curId"]);
            oForm.put("prv_cur_id", '643');
            var oForm = new CForm(this, "oForm", sUrl);
            if (!$isNoU(oPrv)) {
                if (!$isNoU(oPrv["id"])) {
                    oForm.put("prv_id", oPrv["id"]);
                   // oForm.put("prv_cur_id", oPrv["curId"]);
                    oForm.put("prv_cur_id", '643');
                }
                if (!$isNoU(oPrv["sName"])) {
                    oForm.put("prv_name", oPrv["sName"]);
                }
                for (var f in oPrv["constParams"]) {
                    if (oPrv["constParams"].hasOwnProperty(f)) {
                        if ($is(oPrv["constParams"][f], String)) {
                            oForm.put(f, oPrv["constParams"][f]);
                        }
                    }
                }
            }
            oForm.submit();
        }
    }
);
