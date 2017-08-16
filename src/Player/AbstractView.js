export default class AbstractView {

  constructor(){
  }

  findControl( sel ) {
    return this.el.querySelector( `.controls ${sel}` )
  }


  renderQualityOptions() {
      if ( this.adapter.getTarget === undefined ) {
          return;
      }
      const qLevelMap = {
              small: "240p",
              medium: "360p",
              large: "480p",
              hd720: "720p",
              hd1080: "1080p",
              highres: "highres"
          },
          options = this.adapter.getTarget().getAvailableQualityLevels(),
          level = this.adapter.getTarget().getPlaybackQuality(),
          optionsHTML = options.reduce(( sum, val)  => {
            return sum + `<option title="Change quality" value="${val}" ${( level === val ? `selected` : `` )}>
              ${( qLevelMap[ val ] || val )}
            </option>`;
          });

      this.quality.innerHTML = `<select name="qualityLevel">${optionsHTML}</select>'`;
  }

  getTimeByFloat( ctFloat ) {
       var t = {
               hours: 0,
               min: 0,
               sec: 0
           },
           minFloat = ctFloat / 60,
           hourFloat = minFloat / 60;

       if ( ctFloat ) {
           t.sec = Math.floor( ctFloat ); // if less than 60 sec
           t.min = Math.floor( minFloat ); // if less than 60 min
           t.hours = Math.floor( hourFloat );
           if ( t.hours ) {
               t.min = Math.floor( minFloat - ( t.hours * 60 ) );
           }
           if ( t.hours || t.min ) {
               t.sec = Math.floor( ctFloat - ( t.min * 60 ) - ( t.hours * 60 * 60 ) );
           }
       }
       return t;
  }

}