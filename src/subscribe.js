sqmDomReady = (function () {
  var functionToExecute
  var rafId
  var intervalId
  function bodyElementExists() {
    var bodyElement = document.body || document.getElementsByTagName('body')[0]
    var bodyElementExists = bodyElement ? true : false
    return bodyElementExists
  }
  function executeWithRequestAnimationFrame() {
    if (bodyElementExists()) {
      window.cancelAnimationFrame(rafId)
      functionToExecute()
    } else {
      rafId = window.requestAnimationFrame(executeWithRequestAnimationFrame)
    }
  }
  function executeWithInterval() {
    if (bodyElementExists()) {
      window.clearInterval(intervalId)
      functionToExecute()
    } else if (intervalId === undefined) {
      intervalId = window.setInterval(executeWithInterval, 100)
    }
  }
  function executeImmediately(fn) {
    functionToExecute()
  }
  return function (fn) {
    functionToExecute = fn
    if (window.requestAnimationFrame) {
      executeWithRequestAnimationFrame()
    } else if (window.setInterval) {
      executeWithInterval()
    } else {
      executeImmediately()
    }
  }
})()
sqmDomReady(function () {
  var nsfBody =
    nsfBody || document.body || document.getElementsByTagName('body')[0]
  var nsfHead =
    nsfHead || document.head || document.getElementsByTagName('head')[0]
  var nsfPlaceholder15 = document.getElementById('sqm_form_15')
  if (!nsfPlaceholder15) {
    console.log('entering')
    var nsfPlaceholder15 = document.createElement('div')
    nsfPlaceholder15.id = 'sqm_form_15'
    nsfBody.appendChild(nsfPlaceholder15)
  }
  var css = ''
  var nsfStyle15 = document.createElement('style')
  nsfStyle15.type = 'text/css'
  if (nsfStyle15.styleSheet) {
    nsfStyle15.styleSheet.cssText = css
  } else {
    nsfStyle15.appendChild(document.createTextNode(css))
  }
  nsfHead.appendChild(nsfStyle15)
  nsfPlaceholder15.innerHTML = ''
  if (typeof nsfUtils === 'undefined') {
    if (nsfUtils === undefined) {
      var nsfUtils = true
      String.prototype.nsftrim =
        String.prototype.nsftrim ||
        function () {
          return this.replace(/^\s+|\s+$/g, '')
        }
    }
    function forEach(arr, fn) {
      for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i)
      }
    }
    function windowWidth() {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      )
    }
    function windowHeight() {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      )
    }
    function documentWidth() {
      var body = document.body,
        html = document.documentElement
      return Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth,
      )
    }
    function documentHeight() {
      var body = document.body,
        html = document.documentElement
      return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      )
    }
    function getParameterByName(name, url) {
      if (!url) url = window.location.href
      name = name.replace(/[\[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
    function gebid(el) {
      return document.getElementById(el)
    }
    function gebtn(el) {
      return document.getElementsByTagName(el)
    }
    function showModal(html) {
      var bodyEl = document.getElementsByTagName('body')[0]
      var wrapper = document.createElement('div')
      wrapper.classList.add('nsf-modal-wrapper')
      var modal = document.createElement('div')
      modal.classList.add('nsf-modal')
      modal.innerHTML = html
      var closeButton = document.createElement('div')
      closeButton.classList.add('nsf-modal-close')
      closeButton.innerHTML = '&times;'
      modal.insertBefore(closeButton, modal.firstChild)
      wrapper.appendChild(modal)
      bodyEl.appendChild(wrapper)
      wrapper.onclick = function (e) {
        if (e.target !== wrapper && e.target !== closeButton) {
          return
        }
        removeModal()
      }
      setTimeout(function () {
        wrapper.classList.add('nsf-modal-wrapper--visible')
        modal.classList.add('nsf-modal--visible')
      }, 10)
    }
    function removeModal() {
      var wrapper = document.getElementsByClassName('nsf-modal-wrapper')
      if (!wrapper.length) {
        return
      }
      wrapper = wrapper[0]
      wrapper.classList.remove('nsf-modal-wrapper--visible')
      var modal = wrapper.getElementsByClassName('nsf-modal')
      if (!modal.length) {
        return
      }
      modal = modal[0]
      modal.classList.remove('nsf-modal--visible')
      setTimeout(function () {
        wrapper.remove()
      }, 300)
    }
    var UID = {
      _current: 0,
      getNew: function () {
        this._current++
        return this._current
      },
    }
    HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
      var _this = this
      var _sheetId = 'pseudoStyles'
      var _head = document.head || document.getElementsByTagName('head')[0]
      var _sheet =
        document.getElementById(_sheetId) || document.createElement('style')
      _sheet.id = _sheetId
      var className = 'pseudoStyle' + UID.getNew()
      _this.className += ' ' + className
      _sheet.innerHTML +=
        ' .' + className + ':' + element + '{' + prop + ':' + value + '}'
      _head.appendChild(_sheet)
      return this
    }
    function cssExists(cn, prop, val) {
      var retval = false
      var tags = document.getElementsByClassName(cn)
      if (tags.length > 0) {
        if (tags[0][prop] == val) retval = true
      }
      return retval
    }
    function fadeIn(el, ms) {
      if (!el) return
      el.style.opacity = 0
      el.style.filter = 'alpha(opacity=0)'
      el.style.display = 'inline-block'
      el.style.visibility = 'visible'
      if (ms) {
        var opacity = 0
        var timer = setInterval(function () {
          opacity += 50 / ms
          if (opacity >= 1) {
            clearInterval(timer)
            opacity = 1
          }
          el.style.opacity = opacity
          el.style.filter = 'alpha(opacity=' + opacity * 100 + ')'
        }, 50)
      } else {
        el.style.opacity = 1
        el.style.filter = 'alpha(opacity=1)'
      }
    }
    function fadeOut(el, ms) {
      if (!el) return
      if (ms) {
        var opacity = 1
        var timer = setInterval(function () {
          opacity -= 50 / ms
          if (opacity <= 0) {
            clearInterval(timer)
            opacity = 0
            el.style.display = 'none'
            el.style.visibility = 'hidden'
          }
          el.style.opacity = opacity
          el.style.filter = 'alpha(opacity=' + opacity * 100 + ')'
        }, 50)
      } else {
        el.style.opacity = 0
        el.style.filter = 'alpha(opacity=0)'
        el.style.display = 'none'
        el.style.visibility = 'hidden'
      }
    }
    function slideIn(el, from, ms) {
      if (!el) return
      if (!from) from = 'left'
      var end = 10
      var delta = 5
      ms = 1000
      if (ms) {
        el.style.display = 'block'
        var curpos = el.getBoundingClientRect()
        var w = parseInt(el.offsetWidth)
        el.style.display = 'none'
        if (w > 0) delta = parseInt((12 * w) / ms)
        el.style[from] = '-' + w + 'px'
        el.style.width = w + 'px'
        if (from == 'left') {
          el.style.right = 'auto'
        } else {
          el.style.left = 'auto'
        }
        fadeIn(el, 200)
        var cp = 0 - w
        var timer = setInterval(function () {
          cp += delta
          if (cp < 0) {
            el.style[from] = cp + 'px'
            var tpos = el.getBoundingClientRect()
          } else {
            clearInterval(timer)
            el.style[from] = end + 'px'
          }
        }, 5)
      } else {
        el.style[from] = end + 'px'
      }
    }
    function trigger(el, eventName) {
      if (document.createEvent) {
        var event = document.createEvent('HTMLEvents')
        event.initEvent(eventName, true, false)
        el.dispatchEvent(event)
      } else if (el.fireEvent) {
        el.fireEvent('on' + eventName)
      } else {
        return false
      }
    }
  }
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this
      do {
        i = matches.length
        while (--i >= 0 && matches.item(i) !== el) {}
      } while (i < 0 && (el = el.parentElement))
      return el
    }
  }
  function init_form_15() {
    gebid('nsf-form-15').setAttribute('novalidate', 'novalidate')
    if (gebid('nsf-redirect-15')) {
      gebid('nsf-redirect-15').value = ''
    }
    if (!gebid('nsf-return-url-15')) {
      var input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'returnurl'
      input.id = 'nsf-return-url-15'
      input.value = document.location.href
      gebid('nsf-form-15').appendChild(input)
    } else {
      gebid('nsf-return-url-15').value = document.location.href
    }
    if (!gebid('nsf-return-id-15')) {
      var input2 = document.createElement('input')
      input2.type = 'hidden'
      input2.name = 'returnid'
      input2.id = 'nsf-return-id-15'
      input2.value = '15'
      gebid('nsf-form-15').appendChild(input2)
    } else {
      gebid('nsf-return-id-15').value = '15'
    }
    var originator = document.createElement('input')
    originator.type = 'hidden'
    originator.name = 'originator'
    originator.id = 'nsf-originator-15'
    originator.value = document.location.href
    gebid('nsf-form-15').appendChild(originator)
    var breakw = 301
    var formClass = '' + gebid('nsf-form-15').getAttribute('class')
    if (formClass.indexOf('form-horizontal') > -1) breakw = 501
    var formgroups = gebid('nsf-form-15').getElementsByClassName('form-group')
    if (formgroups.length > 0) {
      for (var i = 0; i < formgroups.length; i++) {
        formgroups[i].innerHTML = formgroups[i].innerHTML
          .replace(/(?:\r\n|\r|\n)/g, '')
          .replace(/\t/g, '')
          .replace(/> </g, '')
      }
    }
    var selects = gebid('nsf-form-15').getElementsByTagName('select')
    if (selects.length > 0) {
      for (var csi = 0; csi < selects.length; csi++) {
        var currentSelect = selects[csi]
        var placeholder = ''
        var customClass = ''
        var dateHolder = null
        var dhw = 0
        var selClass = currentSelect.className.nsftrim()
        var opt = currentSelect.getElementsByTagName('option')
        if (opt.length > 0) {
          if (opt[0].value === '') {
            optclass = opt[0].getAttribute('class')
            if (optclass !== 'nsf-phone-cc-options') {
              placeholder = opt[0].text
              currentSelect.remove(0)
            }
          }
        }
        if (
          currentSelect.required == 'true' ||
          currentSelect.required == 'required' ||
          currentSelect.required
        )
          customClass += 'required '
        currentSelect.removeAttribute('required')
        var selName = currentSelect.name
        if (currentSelect.getAttribute('multiple')) {
          currentSelect.name = selName + '[]'
        }
        if (placeholder === '')
          placeholder = currentSelect.getAttribute('placeholder')
        if (selClass.indexOf(' ') > 0) {
          var c = selClass.split(' ')
          for (j = 0; j < c.length; j++) {
            if (c[j].indexOf('nsf-date') > -1) customClass += c[j] + ' '
            if (c[j].indexOf('fd') > -1) customClass += c[j] + ' '
          }
          customClass = customClass.nsftrim()
        } else {
          if (selClass.indexOf('nsf-date') > -1) customClass += selClass
        }
        if (selClass.indexOf('nsf-date') > -1) {
          dateHolder = currentSelect.parentElement.parentElement
          dhw = Math.max(dateHolder.offsetWidth, dateHolder.clientWidth)
          if (dhw < breakw) customClass += ' fullw'
        }
        if (currentSelect.multiple) {
        } else {
          if (!gebid(currentSelect.id.replace('nsf-', 'nsf-hid-'))) {
            var inp = document.createElement('input')
            inp.id = currentSelect.id.replace('nsf-', 'nsf-hid-')
            inp.type = 'hidden'
            inp.name = currentSelect.name
            inp.value = ''
            currentSelect.parentElement.appendChild(inp)
            currentSelect.name = ''
          }
        }
        if (selClass.indexOf('nsf-phone-cc') > -1) {
          new NSFSelectr(currentSelect, {
            placeholder: '...',
            customClass: customClass,
            renderSelection: renderCountryCode,
          }).on('selectr.change', function () {
            var ajdi = this.el.getAttribute('rel')
            gebid(ajdi).focus()
            var selval = this.getValue() === null ? '' : this.getValue()
            gebid(this.el.id.replace('nsf-', 'nsf-hid-')).value = selval
          })
        } else if (currentSelect.multiple) {
          new NSFSelectr(currentSelect, {
            placeholder: placeholder,
            customClass: customClass,
          }).on('selectr.change', function (option) {
            var currentValue = this.getValue()
            var select = option.parentElement
            for (var oi = 0; oi < select.options.length; oi++) {
              select.options[oi].selected = false
              for (var ci = 0; ci < currentValue.length; ci++) {
                if (currentValue[ci] === select.options[oi].value) {
                  select.options[oi].selected = true
                }
              }
            }
          })
        } else {
          var selectr = new NSFSelectr(currentSelect, {
            placeholder: placeholder,
            customClass: customClass,
          }).on('selectr.change', function () {
            var selval = this.getValue() === null ? '' : this.getValue()
            gebid(this.el.id.replace('nsf-', 'nsf-hid-')).value = selval
          })
        }
        if (selClass.indexOf('nsf-date') > -1) {
          currentSelect.parentElement.setAttribute('style', '')
          if (dhw < breakw)
            currentSelect.setAttribute('style', 'width: 100% !important')
          var ihid = currentSelect.id
            .replace('nsf-', '')
            .replace('-month-15', '')
          var newihid = 'nsf-' + ihid + '-15'
          if (gebid(ihid)) gebid(ihid).id = newihid
        }
      }
    }
    var inputs = gebid('nsf-form-15').getElementsByTagName('input')
    if (inputs.length > 0) {
      var i = 0
      for (i = 0; i < inputs.length; i++) {
        var inp = inputs[i]
        var inpname = inp.name
        if (inp.type == 'checkbox' && inpname.indexOf('user[gdpr_') === -1) {
          inp.name = inpname + '[]'
        }
        if (inp.getAttribute('required') == 'false') {
          inp.removeAttribute('required')
          inp.required = false
        }
        if (inp.type == 'tel') {
          var cl = '' + inp.getAttribute('class')
          var req = '' + inp.getAttribute('required')
          var isRequiredByDefault =
            cl.indexOf('required') > -1 ||
            inp.getAttribute('required') ||
            req == 'required' ||
            req == 'true'
          if (!isRequiredByDefault) {
            inp.onchange = function (e) {
              var hasAnyValue = !!e.target.value
              if (hasAnyValue) e.target.setAttribute('required', 'required')
              else e.target.removeAttribute('required')
            }
          }
        }
      }
    }
    var tarea = gebid('nsf-form-15').getElementsByTagName('textarea')
    if (tarea.length > 0) {
      for (var i = 0; i < tarea.length; i++) {
        var inp = tarea[i]
        if (inp.getAttribute('required') == 'false') {
          inp.removeAttribute('required')
          inp.required = false
        }
        var val = '' + inp.value
        var plh = '' + inp.getAttribute('placeholder')
        if (val !== '' && val == plh) {
          inp.setAttribute(
            'onfocus',
            'if(this.value=="' + plh + '") this.value=""',
          )
          inp.setAttribute(
            'onblur',
            'if(this.value=="") this.value="' + plh + '"',
          )
        }
      }
    }
    function renderCountryCode(option) {
      var pos = option.getAttribute('data-src').replace(',', 'px ') + 'px'
      return (
        '<span class="nsf-phone-flag" style="background-position: ' +
        pos +
        ';" title="' +
        option.textContent.nsftrim() +
        '"></span> ' +
        option.getAttribute('value')
      )
    }
    var gdprCheckboxes =
      gebid('nsf-form-15').getElementsByClassName('js-gdpr-checkbox')
    for (var i = 0; i < gdprCheckboxes.length; i++) {
      var gdprCb = gdprCheckboxes[i]
      var link = gdprCb.getElementsByClassName('js-nsf-modal-link')
      if (!link.length) {
        continue
      }
      link = link[0]
      var modalHtml = link.getElementsByClassName('js-nsf-modal-html')
      if (!modalHtml.length || !modalHtml[0].innerHTML.trim().length) {
        continue
      }
      link.classList.remove('hidden')
    }
    var modalLinks =
      gebid('nsf-form-15').getElementsByClassName('js-nsf-modal-link')
    for (var i = 0; i < modalLinks.length; i++) {
      var modalLink = modalLinks[i]
      modalLink.onclick = function (e) {
        e.preventDefault()
        var modalHtml = this.getElementsByClassName('js-nsf-modal-html')
        if (!modalHtml.length) {
          return
        }
        showModal(modalHtml[0].innerHTML)
      }
    }
    var checkboxLabels = gebid('nsf-form-15').querySelectorAll(
      '.magic-checkbox + label',
    )
    if (checkboxLabels.length) {
      colorValues = checkboxLabels[0].style.color
        .replace(/[^\d,]/g, '')
        .split(',')
      var r = colorValues[0]
      var g = colorValues[1]
      var b = colorValues[2]
      var brightness = (r * 299 + g * 587 + b * 114) / 1000
      if (brightness >= 123) {
        for (var i = 0; i < checkboxLabels.length; i++) {
          checkboxLabels[i].className += ' alt-checkbox'
        }
      }
    }
  }
  gebid('nsf-form-15').onsubmit = function (e) {
    function elementIsVisible(el) {
      var container = el.closest('.form-group')
      var elToCheck = container ? container : el
      var isHidden = elToCheck.style.display === 'none'
      return !isHidden
    }
    e.preventDefault()
    var doSubmit = true
    var hiliteTags = []
    var hiliteLabels = []
    if (gebid('subscribelist-15')) {
      var inputs = gebid('subscribelist-15').getElementsByTagName('input')
      if (inputs.length > 0) {
        var hidlist = ''
        for (var i = 0; i < inputs.length; i++) {
          var inp = inputs[i]
          var inpname = inp.name
          if (inp.type == 'checkbox') {
            if (inp.checked) {
              if (hidlist !== '') hidlist += ','
              hidlist += inp.value
            }
          }
        }
        if (hidlist !== '') gebid('nsf-hiddenlists-15').value = hidlist
      }
    }
    var inputs = gebid('nsf-form-15').getElementsByTagName('input')
    if (inputs.length > 0) {
      for (var i = 0; i < inputs.length; i++) {
        var inp = inputs[i]
        if (!elementIsVisible(inp)) {
          inp.value = ''
          continue
        }
        var cl = '' + inp.getAttribute('class')
        var req = '' + inp.getAttribute('required')
        if (inp.type == 'email' || inp.type == 'text' || inp.type == 'tel') {
          if (
            cl.indexOf('required') > -1 ||
            inp.getAttribute('required') ||
            req == 'required' ||
            req == 'true'
          ) {
            var val = '' + inp.value
            var labels =
              inp.parentElement.parentElement.getElementsByClassName(
                'control-label',
              )
            var lab = null
            if (labels.length > 0) lab = labels[0]
            var doHilite = false
            if (inp.type == 'tel') {
              var countrySelect = !!inp.id
                ? document.querySelector('[rel="' + inp.id + '"]')
                : null
              console.log(countrySelect)
              var isCountrySelected = !countrySelect || !!countrySelect.value
              if (!isCountrySelected) {
                var countryContainer =
                  countrySelect.parentElement.querySelector('.selectr-selected')
                !!countryContainer && hiliteTags.push(countryContainer)
                hiliteLabels.push(lab)
                doSubmit = false
              }
              var re = /^[0-9]+$/
              if (!re.test(val)) doHilite = true
            } else if (inp.type == 'email') {
              var re =
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              if (!re.test(val)) doHilite = true
            } else {
              if (val === '' || val === 'undefined') doHilite = true
            }
            if (doHilite) {
              hiliteTags.push(inp)
              hiliteLabels.push(lab)
              doSubmit = false
            }
          }
        }
      }
    }
    var tarea = gebid('nsf-form-15').getElementsByTagName('textarea')
    if (tarea.length > 0) {
      for (var i = 0; i < tarea.length; i++) {
        var inp = tarea[i]
        if (!elementIsVisible(inp)) {
          inp.value = ''
          continue
        }
        var cl = '' + inp.getAttribute('class')
        var req = '' + inp.getAttribute('required')
        var val = '' + inp.value
        var plh = '' + inp.getAttribute('placeholder')
        if (val !== '' && val == plh) {
          val = ''
          inp.value = ''
        }
        if (
          cl.indexOf('required') > -1 ||
          inp.getAttribute('required') ||
          req == 'required' ||
          req == 'true'
        ) {
          if ((val == '' || val == 'undefined') && elementIsVisible(inp)) {
            var labels =
              inp.parentElement.parentElement.getElementsByClassName(
                'control-label',
              )
            var lab = null
            if (labels.length > 0) lab = labels[0]
            hiliteTags.push(inp)
            hiliteLabels.push(lab)
            doSubmit = false
          }
        }
      }
    }
    var mysel = gebid('nsf-form-15').getElementsByTagName('select')
    if (mysel.length > 0) {
      for (var ms = 0; ms < mysel.length; ms++) {
        var cursel = mysel[ms]
        if (!elementIsVisible(cursel)) {
          cursel.value = ''
          var nsfSelectr = NSFSelectr.prototype.getInstance(cursel)
          if (nsfSelectr && nsfSelectr.getValue()) {
            nsfSelectr.setValue(nsfSelectr.getValue())
          }
          continue
        }
        var curselpar = cursel.parentElement
        var cl = '' + curselpar.getAttribute('class')
        var req = '' + curselpar.getAttribute('required')
        var labels =
          curselpar.parentElement.parentElement.getElementsByClassName(
            'control-label',
          )
        var labcl = ''
        var lab = null
        if (labels.length > 0) {
          lab = labels[0]
          labcl = '' + lab.getAttribute('class')
        }
        var hasValue = false
        if (cursel.multiple) {
          var optcnt = cursel.options.length
          if (optcnt > 0) {
            for (o = 0; o < optcnt; o++) {
              var curopt = cursel.options[o]
              if (
                curopt.selected ||
                curopt.getAttribute('selected') == 'selected'
              ) {
                var inp = document.createElement('input')
                inp.type = 'hidden'
                inp.name = cursel.name
                inp.value = curopt.value
                gebid('nsf-form-15').appendChild(inp)
                if (curopt.value !== '') hasValue = true
              }
            }
          }
          cursel.name = ''
        } else {
          var hidid = cursel.id.replace('nsf-', 'nsf-hid-')
          if (gebid(hidid).value !== '') hasValue = true
        }
        if (
          (cl.indexOf('required') > -1 ||
            curselpar.getAttribute('required') ||
            req == 'required' ||
            req == 'true') &&
          !hasValue
        ) {
          hiliteLabels.push(curselpar)
          hiliteLabels.push(lab)
          doSubmit = false
        }
      }
    }
    var chks = gebid('nsf-form-15').getElementsByClassName(
      'form-group-checkbox',
    )
    var labelDefaultColor = null
    if (chks.length > 0) {
      for (var ci = 0; ci < chks.length; ci++) {
        var chkbox = chks[ci]
        var inputs = chkbox.getElementsByTagName('input')
        var labels = chkbox.getElementsByClassName('control-label')
        if (!elementIsVisible(chkbox)) {
          for (var ii = 0; ii < inputs.length; ii++) {
            inputs[ii].checked = false
          }
          continue
        }
        var labcl = ''
        var lab = null
        if (labels.length > 0) {
          lab = labels[0]
          labcl = '' + lab.getAttribute('class')
        }
        var doHilite = false
        var hasValue = false
        if (inputs.length > 0) {
          for (var i = 0; i < inputs.length; i++) {
            var inp = inputs[i]
            if (
              inp.type == 'checkbox' &&
              (inp.checked || inp.checked == 'true' || inp.checked == 'checked')
            )
              hasValue = true
          }
        }
        if (
          chkbox
            .getElementsByClassName('form-group-container')[0]
            .getAttribute('class')
            .indexOf('required') > -1 &&
          !hasValue
        ) {
          if (labcl !== '') lab.setAttribute('class', labcl + ' required-empty')
          var mc = chkbox.getElementsByTagName('label')
          if (mc.length > 0) {
            var old = ''
            for (var i = 0; i < mc.length; i++) {
              old = mc[i].style.color
              mc[i].style.color = '#f00'
            }
            labelDefaultColor = old
            ;(function (mc, old, lab, labcl) {
              setTimeout(function () {
                for (var i = 0; i < mc.length; i++) {
                  mc[i].style.color = old
                  if (labcl !== '') lab.setAttribute('class', labcl)
                }
              }, 3000)
            })(mc, old, lab, labcl)
          }
          doSubmit = false
        }
      }
    }
    if (doSubmit) {
      var act = gebid('nsf-form-action-url-15').value
      gebid('nsf-form-15').action = act
      gebid('nsf-form-15').submit()
    } else {
      for (var h = 0; h < hiliteTags.length; h++) {
        var ht = hiliteTags[h]
        var cl = '' + ht.getAttribute('class')
        ht.setAttribute('class', cl + ' required-empty')
      }
      for (var h = 0; h < hiliteLabels.length; h++) {
        var ht = hiliteLabels[h]
        var cl = '' + ht.getAttribute('class')
        ht.setAttribute('class', cl + ' required-empty')
      }
      setTimeout(function () {
        for (var h = 0; h < hiliteTags.length; h++) {
          var ht = hiliteTags[h]
          var cl = '' + ht.getAttribute('class')
          if (cl !== '') {
            cl = cl.replace('required-empty', '').nsftrim()
            ht.setAttribute('class', cl)
          }
        }
        for (var h = 0; h < hiliteLabels.length; h++) {
          var ht = hiliteLabels[h]
          var cl = '' + ht.getAttribute('class')
          if (cl !== '') {
            cl = cl.replace('required-empty', '').nsftrim()
            ht.setAttribute('class', cl)
          }
        }
      }, 3000)
      return false
    }
  }

  init_form_15()
  var SqmFieldValuesManager = (function () {
    function Manager(formId) {
      this.formId = formId
      this.form = document.getElementById(formId)
    }
    Manager.prototype = {
      dummyHandler: function (field) {
        return
      },
      textHandler: function (field) {
        var element = this.form.querySelector(
          '[name="user[' + field.name + ']"]',
        )
        if (!element) {
          return
        }
        element.value = field.defaultValue
      },
      checkboxHandler: function (field) {
        var elements = this.form.querySelectorAll(
          '[name="user[' + field.name + '][]"]',
        )
        if (!elements.length) {
          return
        }
        var defaults = field.defaultValue.split(',')
        elements.forEach(function (e) {
          if (defaults.indexOf(e.value) > -1) {
            e.checked = true
          }
        })
      },
      radioHandler: function (field) {
        var elements = this.form.querySelectorAll(
          '[name="user[' + field.name + ']"]',
        )
        if (!elements.length) {
          return
        }
        elements.forEach(function (e) {
          e.checked = Boolean(
            field.defaultValue && e.value === field.defaultValue,
          )
        })
      },
      phoneHandler: function (field) {
        var numField = this.form.querySelector(
          '[name="user[' + field.name + '][num]"]',
        )
        if (!numField) {
          return
        }
        var countryField = this.form.querySelector(
          '[rel="' + numField.getAttribute('id') + '"]',
        )
        if (!countryField) {
          return
        }
        var defaultParts = field.defaultValue.split(',')
        if (defaultParts.length === 1) {
          return
        }
        if (defaultParts[0]) {
          var selectr = NSFSelectr.prototype.getInstance(countryField)
          var countryVal =
            defaultParts[0].indexOf('+') === 0
              ? defaultParts[0].substr(1)
              : defaultParts[0]
          if (selectr) {
            var selectrChangeEvent = selectr._events['selectr.change']
            delete selectr._events['selectr.change']
            selectr.setValue(countryVal)
            selectr._events['selectr.change'] = selectrChangeEvent
          }
        }
        if (defaultParts[1]) {
          numField.value = defaultParts[1]
        }
      },
      dateHandler: function (field) {
        var yearElement = this.form.querySelector(
          '[name="user[' + field.name + '][year]"]',
        )
        var monthElement = this.form.querySelector(
          '[name="user[' + field.name + '][month]"]',
        )
        var dayElement = this.form.querySelector(
          '[name="user[' + field.name + '][day]"]',
        )
        if (!yearElement || !monthElement || !dayElement) {
          return
        }
        var defaultParts = field.defaultValue.split('-')
        if (defaultParts.length !== 3) {
          return
        }
        var elements = [yearElement, monthElement, dayElement]
        var elementId, el, selectr, val
        for (var i = 0, l = elements.length; i < l; i++) {
          elementId = elements[i].getAttribute('id').replace('hid-', '')
          el = this.form.querySelector('#' + elementId)
          selectr = NSFSelectr.prototype.getInstance(el)
          val =
            i > 0
              ? '00'.substring(0, 2 - defaultParts[i].length) + defaultParts[i]
              : defaultParts[i]
          if (selectr) {
            selectr.setValue(val)
          }
        }
      },
      multidropHandler: function (field) {
        var element = this.form.querySelector(
          '[name="user[' + field.name + '][]"]',
        )
        if (!element) {
          return
        }
        var defaultParts = field.defaultValue.split(',')
        var selectr = NSFSelectr.prototype.getInstance(element)
        if (selectr) {
          selectr.setValue(defaultParts)
        }
      },
      dropHandler: function (field) {
        var element = this.form.querySelector(
          '[name="user[' + field.name + ']"]',
        )
        if (!element) {
          return
        }
        var idAttr = element.getAttribute('id').replace('hid-', '')
        element = this.form.querySelector('#' + idAttr)
        if (!element) {
          return
        }
        var selectr = NSFSelectr.prototype.getInstance(element)
        if (selectr) {
          var currentValue = selectr.getValue()
          if (!field.defaultValue && currentValue) {
            selectr.setValue(currentValue)
            return
          }
          if (field.defaultValue && field.defaultValue !== currentValue) {
            selectr.setValue(field.defaultValue)
          }
        }
      },
      getDefaultValueHandler: function (fieldType) {
        switch (fieldType) {
          case 'text':
          case 'textarea':
            return this.textHandler
          case 'checkbox':
            return this.checkboxHandler
          case 'radio':
            return this.radioHandler
          case 'phone':
            return this.phoneHandler
          case 'birthday':
          case 'date2':
            return this.dateHandler
          case 'multipledropdown':
            return this.multidropHandler
          case 'singledropdown':
            return this.dropHandler
        }
        return this.dummyHandler
      },
      setDefaultValues: function (field) {
        if (!this.form) {
          throw (
            'Cannot set form default values. Form with id ' +
            this.formId +
            ' was not found.'
          )
        }
        var fieldDefaultHandler = this.getDefaultValueHandler(field.type)
        fieldDefaultHandler.call(this, field)
      },
    }
    Manager.prototype.constructor = Manager
    return Manager
  })()
  ;(function (formId, fields) {
    var manager = new SqmFieldValuesManager(formId)
    for (var i = 0, l = fields.length; i < l; i++) {
      manager.setDefaultValues(fields[i])
    }
  })('sqm_form_15', [
    { name: 'html', type: 'radio', defaultValue: '1' },
    { name: 'phone', type: 'phone', defaultValue: ' ' },
  ])
  ;(function (formId, fields) {
    function getUserQueryParameters() {
      var obj = {}
      var queryString = window.location.search.slice(1).split('#')[0]
      if (!queryString) {
        return obj
      }
      var arr = queryString.split('&')
      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split('=')
        var paramName = a[0].toLowerCase()
        var paramValue =
          typeof a[1] === 'undefined' ? true : decodeURIComponent(a[1])
        if (!paramName.match(/user\[(?:.+?)\]/)) {
          continue
        }
        var key = /user\[(.+?)\]/.exec(paramName)[1]
        if (paramName.match(/\]\[(\d+)?\]$/)) {
          if (!obj[key]) {
            obj[key] = []
          }
          if (paramName.match(/\[\d+\]$/)) {
            var index = /\[(\d+)\]$/.exec(paramName)[1]
            obj[key][index] = paramValue
          } else {
            obj[key].push(paramValue)
          }
        } else if (paramName.match(/\]\[([a-zA-Z][a-zA-Z_0-9]*)\]$/)) {
          if (!obj[key]) {
            obj[key] = {}
          }
          var keyKey = /\[([a-zA-Z][a-zA-Z_0-9]*)\]$/.exec(paramName)[1]
          obj[key][keyKey] = paramValue
        } else {
          obj[key] = paramValue
        }
      }
      return obj
    }
    function getFieldDefaultValue(valueToSet) {
      if (typeof valueToSet === 'string') {
        return valueToSet
      }
      if (Object.prototype.toString.call(valueToSet) === '[object Array]') {
        return valueToSet.join(',')
      }
      return undefined
    }
    var userQueryParameters = getUserQueryParameters()
    var manager = new SqmFieldValuesManager(formId)
    for (var i = 0, l = fields.length; i < l; i++) {
      var field = fields[i]
      var fieldQueryParameter = userQueryParameters[field.name]
      var queryParameterExists = fieldQueryParameter !== undefined
      if (!queryParameterExists) {
        continue
      }
      field.defaultValue = getFieldDefaultValue(fieldQueryParameter)
      if (field.defaultValue === undefined) {
        continue
      }
      manager.setDefaultValues(field)
    }
  })('sqm_form_15', [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'html', type: 'radio' },
    { name: 'surname', type: 'text' },
    { name: 'gender', type: 'radio' },
    { name: 'uporabnisko_ime', type: 'text' },
    { name: 'geslo', type: 'text' },
    { name: 'sporocilo', type: 'textarea' },
    { name: 'phone', type: 'phone' },
  ])
  ;(function (formId, conditions) {
    if (window.Element && !Element.prototype.closest) {
      Element.prototype.closest = function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i,
          el = this
        do {
          i = matches.length
          while (--i >= 0 && matches.item(i) !== el) {}
        } while (i < 0 && (el = el.parentElement))
        return el
      }
    }
    function addEventHandler(elem, eventType, handler) {
      if (elem.addEventListener) {
        elem.addEventListener(eventType, handler, false)
      } else if (elem.attachEvent) {
        elem.attachEvent('on' + eventType, handler)
      }
    }
    function ConditionalDisplayManager(fId, conditions) {
      this.form = document.getElementById(fId)
      this.conditions = conditions
      this.initialize()
    }
    ConditionalDisplayManager.prototype = {
      initialize: function () {
        var elements = Object.keys(this.conditions)
        this.checkElements(elements)
        this.setListeners()
      },
      checkElements: function (elements) {
        for (var i = 0, l = elements.length; i < l; i++) {
          this.showOrHideElement(elements[i])
        }
      },
      showOrHideElement: function (element) {
        var domElement = this.form.querySelector(
          '[name^="user[' + element + ']"]',
        )
        if (!domElement) {
          return
        }
        var conditions = this.conditions[element].conditions[0]
        var operators = this.conditions[element].conditions[1]
        var conditionResults = []
        for (var i = 0, l = conditions.length; i < l; i++) {
          var checkResult = this.checkCondition(conditions[i])
          conditionResults.push(checkResult)
        }
        var showElement = this.combineConditionsWithOperators(
          conditionResults,
          operators,
        )
        var formGroup = domElement.closest('.form-group')
        formGroup.style.display = showElement ? 'block' : 'none'
      },
      checkCondition: function (conditionalData) {
        var name = conditionalData[0]
        var type = conditionalData[1]
        var op = conditionalData[2]
        var val = conditionalData[3]
        var fieldValue = this.getFieldValue(name, type)
        if (fieldValue === null) {
          return false
        }
        var result = this.compareFieldValues(fieldValue, op, val)
        return result
      },
      getFieldValue: function (name, type) {
        var el = this.form.querySelector('[name^="user[' + name + ']"]')
        if (!el) {
          return null
        }
        switch (type) {
          case 'singledropdown':
            var elId = el.getAttribute('id').replace('hid-', '')
            var el = this.form.querySelector('#' + elId)
            var selectr = NSFSelectr.prototype.getInstance(el)
            return selectr && selectr.getValue()
          case 'radio':
            var el = this.form.querySelector(
              '[name^="user[' + name + ']"]:checked',
            )
            return el ? el.value : ''
          case 'checkbox':
            var els = this.form.querySelectorAll(
              '[name^="user[' + name + ']"]:checked',
            )
            var result = []
            els.forEach(function (e) {
              result.push(e.value)
            })
            return result
          case 'multipledropdown':
            var el = this.form.querySelector(
              'select[name="user[' + name + '][]"]',
            )
            var selectr = NSFSelectr.prototype.getInstance(el)
            return selectr && selectr.getValue()
          case 'phone':
            var countrySelect = el
              .closest('.form-group')
              .querySelector('select')
            var selectr = NSFSelectr.prototype.getInstance(countrySelect)
            var selectrCountryVal = selectr.getValue()
            var countryVal = selectrCountryVal
              ? (selectrCountryVal.indexOf('+') === -1 ? '+' : '') +
                selectrCountryVal
              : ''
            return countryVal + el.value
          case 'birthday':
          case 'date2':
            var formGroup = el.closest('.form-group')
            var day = formGroup.querySelector(
              'input[name="user[' + name + '][day]"]',
            )
            var month = formGroup.querySelector(
              'input[name="user[' + name + '][month]"]',
            )
            var year = formGroup.querySelector(
              'input[name="user[' + name + '][year]"]',
            )
            var elements = [year, month, day]
            var result = []
            elements.forEach(function (d) {
              var id = d.getAttribute('id').replace('hid-', '')
              var el = formGroup.querySelector('#' + id)
              var selectr = NSFSelectr.prototype.getInstance(el)
              var res = selectr.getValue()
              result.push(res ? res : 0)
            })
            return result.join('-')
          default:
            return el.value
        }
      },
      compareFieldValues: function (fieldValue, operator, conditionalValue) {
        switch (operator) {
          case '==':
            return fieldValue == conditionalValue
          case '!=':
            return fieldValue != conditionalValue
          case '>':
            return fieldValue > conditionalValue
          case '<':
            return fieldValue < conditionalValue
          case '>=':
            return fieldValue >= conditionalValue
          case '<=':
            return fieldValue <= conditionalValue
          case 'exact':
            if (fieldValue.constructor !== Array) {
              fieldValue = [fieldValue]
            }
            var conditionalValueArray = conditionalValue.split(',')
            if (fieldValue.length !== conditionalValueArray.length) {
              return false
            }
            for (var i = 0, l = conditionalValueArray.length; i < l; i++) {
              if (fieldValue.indexOf(conditionalValueArray[i]) === -1) {
                return false
              }
            }
            return true
          case 'at_least':
            if (fieldValue.constructor !== Array) {
              fieldValue = [fieldValue]
            }
            var conditionalValueArray = conditionalValue.split(',')
            for (var i = 0, l = conditionalValueArray.length; i < l; i++) {
              if (fieldValue.indexOf(conditionalValueArray[i]) === -1) {
                return false
              }
            }
            return true
          case 'one_of':
            if (fieldValue.constructor !== Array) {
              fieldValue = [fieldValue]
            }
            var conditionalValueArray = conditionalValue.split(',')
            for (var i = 0, l = conditionalValueArray.length; i < l; i++) {
              if (fieldValue.indexOf(conditionalValueArray[i]) > -1) {
                return true
              }
            }
            return false
          default:
            return false
        }
      },
      combineConditionsWithOperators: function (conditions, operators) {
        if (conditions.length <= operators.length) {
          throw "Conditions/operators lengths don't match!"
        }
        var currentGroupResult = conditions[0]
        for (var i = 0, l = operators.length; i < l; i++) {
          if (operators[i] === '&&') {
            currentGroupResult = currentGroupResult && conditions[i + 1]
            continue
          }
          if (operators[i] === '||') {
            if (currentGroupResult) {
              break
            }
            currentGroupResult = conditions[i + 1]
          }
        }
        return currentGroupResult
      },
      setListeners: function () {
        var listeners = {}
        var elementNames = Object.keys(this.conditions)
        var self = this
        elementNames.forEach(function (elName) {
          var elConditions = self.conditions[elName].conditions[0]
          elConditions.forEach(function (eC) {
            var conditionalElement = eC[0]
            if (!listeners[conditionalElement]) {
              listeners[conditionalElement] = []
            }
            if (listeners[conditionalElement].indexOf(elName) === -1) {
              listeners[conditionalElement].push(elName)
            }
          })
        })
        var inputs = this.form.querySelectorAll('input, textarea')
        inputs.forEach(function (i) {
          var elementsToCheck = self.getListeners(i, listeners)
          if (elementsToCheck) {
            addEventHandler(i, 'change', function () {
              self.checkElements(elementsToCheck)
            })
          }
        })
        if (typeof NSFSelectr === 'undefined') {
          return
        }
        NSFSelectr.prototype.loadedInstances.forEach(function (s) {
          var elementsToCheck = self.getListeners(s.el, listeners)
          if (elementsToCheck) {
            s.on('selectr.change', function () {
              self.checkElements(elementsToCheck)
            })
          }
        })
      },
      getListeners: function (element, listeners) {
        var elementNames = Object.keys(listeners)
        var formGroup = element.closest('.form-group')
        if (!formGroup) {
          return null
        }
        for (var i = 0, l = elementNames.length; i < l; i++) {
          var el = formGroup.querySelector(
            '[name^="user[' + elementNames[i] + ']"]',
          )
          if (el) {
            return listeners[elementNames[i]]
          }
        }
        return null
      },
    }
    ConditionalDisplayManager.prototype.constructor = ConditionalDisplayManager
    var cdm = new ConditionalDisplayManager(formId, conditions)
  })('sqm_form_15', [])
})
