$(function () {
  var Email = {
    send: function (a) {
      return new Promise(function (n, e) {
        (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
        var t = JSON.stringify(a);
        Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
          n(e);
        });
      });
    },
    ajaxPost: function (e, n, t) {
      var a = Email.createCORSRequest("POST", e);
      a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        (a.onload = function () {
          var e = a.responseText;
          null != t && t(e);
        }),
        a.send(n);
    },
    ajax: function (e, n) {
      var t = Email.createCORSRequest("GET", e);
      (t.onload = function () {
        var e = t.responseText;
        null != n && n(e);
      }),
        t.send();
    },
    createCORSRequest: function (e, n) {
      var t = new XMLHttpRequest();
      return (
        "withCredentials" in t
          ? t.open(e, n, !0)
          : "undefined" != typeof XDomainRequest
          ? (t = new XDomainRequest()).open(e, n)
          : (t = null),
        t
      );
    },
  };

  ("use strict");

  $("#contact-form").validator();

  // when the form is submitted
  $("#contact-form").on("submit", function (e) {
    // if the validator does not prevent form submit
    if (!e.isDefaultPrevented()) {
      var name = $("#contact-form")[0].elements["form_name"].value;
      var email = $("#contact-form")[0].elements["form_email"].value;
      var message = $("#contact-form")[0].elements["form_message"].value;

      $("#send-email-button")[0].disabled = true;
      $("#loading-send-email-icon").removeClass("hide");

      Email.send({
        SecureToken: "9b39df1f-3390-48db-a57e-ea490a86fa54",
        To: "vitorhugojf9@gmail.com",
        From: `${name} - ${email}`,
        Subject: "Portfolio Contact",
        Body: message,
      }).then(() => {
        $("#loading-send-email-icon").addClass("hide");
        $("#send-email-button")[0].disabled = false;

        $("#alert").modal("show");
      });

      return false;
    }
  });
});
