'use strict';

function JT_Simple_Modal(){
    var thisIs = this;

    this.options = {
        header: "Attention!",
        body: "This is a sample Modal",
        headerIcon: "",
        bodyIcon: "",
        type: "alert",
        inputType: "text",
        confirmBtnText: 'OK'
    }

    this.openModal = function(args,callback){
        jQuery.extend(this.options,args);
        jQuery('body').append(this.readyHTML(this.options.type,this.options.customContent));
        jQuery('#jt-simple-modal').css('display','flex').hide().fadeIn('fast');
        jQuery('#jt-simple-modal').on('click','#jt-simple-modal-submit',function(){
            let formData = $('#jt-simple-modal-form').serializeArray().reduce(function(obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});;
            callback(formData);
            thisIs.closeModal();
        });
        jQuery('#jt-simple-modal').on('click','#jt-simple-modal-confirm',function(evnt){
            callback(this, evnt);
            thisIs.closeModal();
        });
        
    }

    this.closeModal = function(){
        jQuery('#jt-simple-modal').fadeOut().remove();
    }

    this.readyHTML = function(type,customContent){
        if(type == "prompt"){
            var modalHtml = "<div id='jt-simple-modal'>";
            modalHtml += "<div id='jt-simple-modal-container'>";
            modalHtml += "<div id='jt-simple-modal-header'><i class='fa "+this.options.headerIcon+"' aria-hidden='true'></i> <h4>"+this.options.header+"</h4><i class='fa fa-times' id='jt-simple-modal-close' aria-hidden='true'></i></div>";
            modalHtml += "<div id='jt-simple-modal-body'><div class='jt-simple-modal-desc'>";
            modalHtml += "<i class='fa "+this.options.bodyIcon+"' aria-hidden='true'></i> <p>"+this.options.body+"</p></div>";
            modalHtml += "<div class='jt-simple-modal-desc'><form id='jt-simple-modal-form'>";
            modalHtml += '<input id="jt-simple-modal-input" name="unlockPassword" type="'+this.options.inputType+'"></form>';
            modalHtml += '<a href="#" class="btn btn-primary" id="jt-simple-modal-submit">Unlock</a></div>';
            modalHtml += "</div>"
            return modalHtml;
        }else if(type == "confirm"){
            var modalHtml = "<div id='jt-simple-modal'>";
            modalHtml += "<div id='jt-simple-modal-container'>";
            modalHtml += "<div id='jt-simple-modal-header'><i class='fa "+this.options.headerIcon+"' aria-hidden='true'></i> <h4>"+this.options.header+"</h4><i class='fa fa-times' id='jt-simple-modal-close' aria-hidden='true'></i></div>";
            modalHtml += "<div id='jt-simple-modal-body'><div class='jt-simple-modal-desc'>";
            modalHtml += "<i class='fa "+this.options.bodyIcon+"' aria-hidden='true'></i> <p>"+this.options.body+"</p></div><div class='jt-simple-modal-desc'>";
            modalHtml += '<button href="#" id="jt-simple-modal-confirm">'+ this.options.confirmBtnText +'</button></div>';
            modalHtml += "</div></div>"
            return modalHtml;
        }else if(type == "custom"){
            var modalHtml = "<div id='jt-simple-modal'>";
            modalHtml += "<div id='jt-simple-modal-container'>";
            modalHtml += "<div id='jt-simple-modal-header'><i class='fa "+this.options.headerIcon+"' aria-hidden='true'></i> <h4>"+this.options.header+"</h4><i class='fa fa-times' id='jt-simple-modal-close' aria-hidden='true'></i></div>";
            modalHtml += "<div id='jt-simple-modal-body'><div class='jt-simple-modal-desc'>";
            modalHtml += "<i class='fa "+this.options.bodyIcon+"' aria-hidden='true'></i> <p>"+this.options.body+"</p></div>";
            modalHtml += customContent;
            modalHtml += "</div>"
            return modalHtml;
        }else{
            var modalHtml = "<div id='jt-simple-modal'>";
            modalHtml += "<div id='jt-simple-modal-container'>";
            modalHtml += "<div id='jt-simple-modal-header'><i class='fa "+this.options.headerIcon+"' aria-hidden='true'></i> <h4>"+this.options.header+"</h4><i class='fa fa-times' id='jt-simple-modal-close' aria-hidden='true'></i></div>";
            modalHtml += "<div id='jt-simple-modal-body'><div class='jt-simple-modal-desc'><i class='fa "+this.options.bodyIcon+"' aria-hidden='true'></i> <p>"+this.options.body+"</p></div></div>";
            return modalHtml;
        }
    }
    
    jQuery('body').on('click','#jt-simple-modal-header #jt-simple-modal-close',function(){
        thisIs.closeModal();
    });

    jQuery('body').on('click','#jt-simple-modal',function(e){
        if (e.target !== this)
            return;
        thisIs.closeModal();
    });

}
