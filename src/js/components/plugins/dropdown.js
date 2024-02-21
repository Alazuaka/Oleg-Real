class Dropdown {
  cssClass = {
    select: "dropdown",
    head: "dropdown__head",
    current: "dropdown__current",
    icon: "dropdown__icon",
    list: "dropdown__list",
    item: "dropdown__item",
    open: "is-open",
    invisible: "is-invisible",
  };

  icon = document.createElement('span')

  constructor(selector) {
    const $select =
        typeof selector === "object"
          ? selector
          : document.querySelector(selector),
      options = Array.from($select.options),
      cssClass = this.cssClass,
      $body = document.querySelector("body"),
      $dropdown = document.createElement("div"),
      $head = document.createElement("div"),
      $current = document.createElement("span"),
      $icon = this.icon,
      $list = document.createElement("ul"),
      listArr = [],
      showList = (event) => {
        if (!$dropdown.classList.contains(cssClass.open)) {
          if (event.key === "Tab") return;
          $dropdown.classList.add(cssClass.open);
          $list.children[$select.selectedIndex].focus();
          return;
        }
        event.preventDefault();
        $dropdown.focus();
        $dropdown.classList.remove(cssClass.open);
        return;
      },
      $createItem = (option) => {
        const $item = document.createElement("li");
        $item.classList.add(cssClass.item);
        $item.dataset.index = option.index;
        $item.innerText = option.innerText;
        $item.tabIndex = -1;
        if (option.selected) {
          $list.dataset.selectedIndex = option.index;
        }
        return $item;
      },
      hasParent = (target, stop, drop) => {
        if (target === stop) {
          return true;
        } else if (target === drop) {
          return false;
        } else if (target.parentElement) {
          return hasParent(target.parentElement, stop, drop);
        }
        return false;
      },
      initDropdown = (event) => {
        const target = event.target,
          key = event.key,
          type = event.type,
          code = event.code,
          hasDropdown = hasParent(target, $dropdown, $body);

        if (type === "click" && !hasDropdown) {
          if ($dropdown.classList.contains(cssClass.open)) {
            $dropdown.classList.remove(cssClass.open);
          }
          return;
        }
        if (
          type === "keydown" &&
          !(
            key === "ArrowLeft" ||
            key === "ArrowDown" ||
            key === "ArrowRight" ||
            key === "ArrowUp" ||
            code === "Space" ||
            code === "Enter" ||
            key === "Tab" ||
            key === "Alt" ||
            key === "Shift" ||
            key === "Control" ||
            key === "Meta" ||
            key === "Backspace" ||
            key === "Super"
          )
        ) {
          const find = listArr.find((item) => {
            return item.textContent[0].toUpperCase() === key.toUpperCase();
          });
          if (find) {
            $select.selectedIndex = find.dataset.index;
            $list.dataset.selectedIndex = $select.selectedIndex;
            $current.textContent = $select.selectedOptions[0].textContent;

            find.focus();
            $select.dispatchEvent(new Event("change"));
          }
        }

        if (
          code === "Space" ||
          code === "Enter" ||
          key === "Tab" ||
          type === "click"
        ) {
          if (type === "click" && target.dataset.index) {
            $select.selectedIndex = target.dataset.index;
            $list.dataset.selectedIndex = $select.selectedIndex;
            $current.textContent = $select.selectedOptions[0].textContent;

            $select.dispatchEvent(new Event("change"));
          }
          showList(event);
        }
        if (
          key === "ArrowLeft" ||
          key === "ArrowDown" ||
          key === "ArrowRight" ||
          key === "ArrowUp"
        ) {
          event.preventDefault();
          if (key === "ArrowLeft" || key === "ArrowUp") {
            if ($list.dataset.selectedIndex <= 0) return;
            $list.dataset.selectedIndex--;
            $list.children[$list.dataset.selectedIndex].focus();
          }
          if (key === "ArrowRight" || key === "ArrowDown") {
            if ($list.dataset.selectedIndex >= $select.options.length - 1)
              return;

            $list.dataset.selectedIndex++;
            $list.children[$list.dataset.selectedIndex].focus();
          }
          $select.selectedIndex = $list.dataset.selectedIndex;
          $current.textContent = $select.selectedOptions[0].textContent;
          $select.value = $select.selectedOptions[0].value;

          $select.dispatchEvent(new Event("change"));
        }
      };


    $dropdown.classList.add(cssClass.select);
    $head.classList.add(cssClass.head);
    $current.classList.add(cssClass.current);
    $icon.classList.add(cssClass.icon);
    $list.classList.add(cssClass.list);
    $select.classList.add(cssClass.invisible);
    $current.textContent = $select.selectedOptions[0].textContent;
    $dropdown.tabIndex = 0;
    $head.append($current);
    $head.append($icon);
    $dropdown.append($head);
    $dropdown.append($list);
    options.forEach((option) => {
      const $item = $createItem(option);
      listArr.push($item);
      $list.append($item);
    });
    $body.addEventListener("click", initDropdown);
    $dropdown.addEventListener("keydown", initDropdown);
    $select.before($dropdown);
    $select.remove();
    $dropdown.prepend($select);
  }
}
