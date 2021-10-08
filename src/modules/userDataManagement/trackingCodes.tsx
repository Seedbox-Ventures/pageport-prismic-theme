import React from 'react'
import { DataSinkType } from './types'

export interface TrackerProps {
  trackingId?: string
}

const FacebookPixel: React.FC<TrackerProps> = ({ trackingId }) => (
  <>
    <script>
      {`<!-- Facebook Pixel Code -->
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${trackingId}');
      fbq('track', 'PageView');

      <!-- End Facebook Pixel Code -->`}
    </script>
  </>
)

const GoogleAnalytics: React.FC<TrackerProps> = ({ trackingId }) => (
  <>
    {'<!-- Global site tag (gtag.js) - Google Analytics -->'}
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
    <script>
      {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '${trackingId}');`}
    </script>
  </>
)

const GoogleTagManager: React.FC<TrackerProps> = ({ trackingId }) => (
  <>
    {'<!-- Google Tag Manager -->'}
    <script>
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${trackingId}');`}
    </script>
    {'<!-- End Google Tag Manager -->'}
  </>
)

const Hotjar: React.FC<TrackerProps> = ({ trackingId }) => (
  <>
    {'<!-- Hotjar Tracking Code -->'}
    <script>
      {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${trackingId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
    </script>
  </>
)

const LinkedInInsightTag: React.FC<TrackerProps> = ({ trackingId }) => (
  <>
    {'<!-- LinkedIn Insight Tag -->'}
    <script>
      {`_linkedin_partner_id = "${trackingId}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);`}
    </script>
    <script>
      {`(function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);`}
    </script>
  </>
)

const VWO: React.FC<TrackerProps> = ({ trackingId }) => (
  <>
    {'<!-- LinkedIn Insight Tag -->'}
    <script>
      {`window._vwo_code = window._vwo_code || (function(){
        var account_id=${trackingId},
        settings_tolerance=2000,
        library_tolerance=2500,
        use_existing_jquery=false,
        is_spa=1,
        hide_element='body',
        
        /* DO NOT EDIT BELOW THIS LINE */
        f=false,d=document,code={use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){
        window.settings_timer=setTimeout(function () {_vwo_code.finish() },settings_tolerance);var a=d.createElement('style'),b=hide_element?hide_element+'{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}':'',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+(+is_spa)+'&r='+Math.random());return settings_timer; }};window._vwo_settings_timer = code.init(); return code; }());`}
    </script>
  </>
)

const trackingCodes: Record<DataSinkType, React.FC<TrackerProps> | null> = {
  [DataSinkType.FacebookPixel]: FacebookPixel,
  [DataSinkType.GoogleAnalytics]: GoogleAnalytics,
  [DataSinkType.GoogleTagManager]: GoogleTagManager,
  [DataSinkType.Hotjar]: Hotjar,
  [DataSinkType.LinkedInInsightTag]: LinkedInInsightTag,
  [DataSinkType.PageportControl]: null,
  [DataSinkType.VWO]: VWO,
}

export default trackingCodes
