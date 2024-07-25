import { bisector, tickStep } from './chunk-I7AXEEPR.js'

// node_modules/d3-time/src/interval.js
var t0 = /* @__PURE__ */ new Date()
var t1 = /* @__PURE__ */ new Date()
function timeInterval(floori, offseti, count, field) {
  function interval(date) {
    return (
      floori(
        (date =
          arguments.length === 0
            ? /* @__PURE__ */ new Date()
            : /* @__PURE__ */ new Date(+date))
      ),
      date
    )
  }
  interval.floor = date => {
    return floori((date = /* @__PURE__ */ new Date(+date))), date
  }
  interval.ceil = date => {
    return (
      floori((date = new Date(date - 1))), offseti(date, 1), floori(date), date
    )
  }
  interval.round = date => {
    const d0 = interval(date),
      d1 = interval.ceil(date)
    return date - d0 < d1 - date ? d0 : d1
  }
  interval.offset = (date, step) => {
    return (
      offseti(
        (date = /* @__PURE__ */ new Date(+date)),
        step == null ? 1 : Math.floor(step)
      ),
      date
    )
  }
  interval.range = (start, stop, step) => {
    const range = []
    start = interval.ceil(start)
    step = step == null ? 1 : Math.floor(step)
    if (!(start < stop) || !(step > 0)) return range
    let previous
    do
      range.push((previous = /* @__PURE__ */ new Date(+start))),
        offseti(start, step),
        floori(start)
    while (previous < start && start < stop)
    return range
  }
  interval.filter = test => {
    return timeInterval(
      date => {
        if (date >= date)
          while ((floori(date), !test(date))) date.setTime(date - 1)
      },
      (date, step) => {
        if (date >= date) {
          if (step < 0)
            while (++step <= 0) {
              while ((offseti(date, -1), !test(date))) {}
            }
          else
            while (--step >= 0) {
              while ((offseti(date, 1), !test(date))) {}
            }
        }
      }
    )
  }
  if (count) {
    interval.count = (start, end) => {
      t0.setTime(+start), t1.setTime(+end)
      floori(t0), floori(t1)
      return Math.floor(count(t0, t1))
    }
    interval.every = step => {
      step = Math.floor(step)
      return !isFinite(step) || !(step > 0)
        ? null
        : !(step > 1)
          ? interval
          : interval.filter(
              field
                ? d => field(d) % step === 0
                : d => interval.count(0, d) % step === 0
            )
    }
  }
  return interval
}

// node_modules/d3-time/src/millisecond.js
var millisecond = timeInterval(
  () => {},
  (date, step) => {
    date.setTime(+date + step)
  },
  (start, end) => {
    return end - start
  }
)
millisecond.every = k => {
  k = Math.floor(k)
  if (!isFinite(k) || !(k > 0)) return null
  if (!(k > 1)) return millisecond
  return timeInterval(
    date => {
      date.setTime(Math.floor(date / k) * k)
    },
    (date, step) => {
      date.setTime(+date + step * k)
    },
    (start, end) => {
      return (end - start) / k
    }
  )
}
var milliseconds = millisecond.range

// node_modules/d3-time/src/duration.js
var durationSecond = 1e3
var durationMinute = durationSecond * 60
var durationHour = durationMinute * 60
var durationDay = durationHour * 24
var durationWeek = durationDay * 7
var durationMonth = durationDay * 30
var durationYear = durationDay * 365

// node_modules/d3-time/src/second.js
var second = timeInterval(
  date => {
    date.setTime(date - date.getMilliseconds())
  },
  (date, step) => {
    date.setTime(+date + step * durationSecond)
  },
  (start, end) => {
    return (end - start) / durationSecond
  },
  date => {
    return date.getUTCSeconds()
  }
)
var seconds = second.range

// node_modules/d3-time/src/minute.js
var timeMinute = timeInterval(
  date => {
    date.setTime(
      date - date.getMilliseconds() - date.getSeconds() * durationSecond
    )
  },
  (date, step) => {
    date.setTime(+date + step * durationMinute)
  },
  (start, end) => {
    return (end - start) / durationMinute
  },
  date => {
    return date.getMinutes()
  }
)
var timeMinutes = timeMinute.range
var utcMinute = timeInterval(
  date => {
    date.setUTCSeconds(0, 0)
  },
  (date, step) => {
    date.setTime(+date + step * durationMinute)
  },
  (start, end) => {
    return (end - start) / durationMinute
  },
  date => {
    return date.getUTCMinutes()
  }
)
var utcMinutes = utcMinute.range

// node_modules/d3-time/src/hour.js
var timeHour = timeInterval(
  date => {
    date.setTime(
      date -
        date.getMilliseconds() -
        date.getSeconds() * durationSecond -
        date.getMinutes() * durationMinute
    )
  },
  (date, step) => {
    date.setTime(+date + step * durationHour)
  },
  (start, end) => {
    return (end - start) / durationHour
  },
  date => {
    return date.getHours()
  }
)
var timeHours = timeHour.range
var utcHour = timeInterval(
  date => {
    date.setUTCMinutes(0, 0, 0)
  },
  (date, step) => {
    date.setTime(+date + step * durationHour)
  },
  (start, end) => {
    return (end - start) / durationHour
  },
  date => {
    return date.getUTCHours()
  }
)
var utcHours = utcHour.range

// node_modules/d3-time/src/day.js
var timeDay = timeInterval(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) =>
    (end -
      start -
      (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) /
    durationDay,
  date => date.getDate() - 1
)
var timeDays = timeDay.range
var utcDay = timeInterval(
  date => {
    date.setUTCHours(0, 0, 0, 0)
  },
  (date, step) => {
    date.setUTCDate(date.getUTCDate() + step)
  },
  (start, end) => {
    return (end - start) / durationDay
  },
  date => {
    return date.getUTCDate() - 1
  }
)
var utcDays = utcDay.range
var unixDay = timeInterval(
  date => {
    date.setUTCHours(0, 0, 0, 0)
  },
  (date, step) => {
    date.setUTCDate(date.getUTCDate() + step)
  },
  (start, end) => {
    return (end - start) / durationDay
  },
  date => {
    return Math.floor(date / durationDay)
  }
)
var unixDays = unixDay.range

// node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval(
    date => {
      date.setDate(date.getDate() - ((date.getDay() + 7 - i) % 7))
      date.setHours(0, 0, 0, 0)
    },
    (date, step) => {
      date.setDate(date.getDate() + step * 7)
    },
    (start, end) => {
      return (
        (end -
          start -
          (end.getTimezoneOffset() - start.getTimezoneOffset()) *
            durationMinute) /
        durationWeek
      )
    }
  )
}
var timeSunday = timeWeekday(0)
var timeMonday = timeWeekday(1)
var timeTuesday = timeWeekday(2)
var timeWednesday = timeWeekday(3)
var timeThursday = timeWeekday(4)
var timeFriday = timeWeekday(5)
var timeSaturday = timeWeekday(6)
var timeSundays = timeSunday.range
var timeMondays = timeMonday.range
var timeTuesdays = timeTuesday.range
var timeWednesdays = timeWednesday.range
var timeThursdays = timeThursday.range
var timeFridays = timeFriday.range
var timeSaturdays = timeSaturday.range
function utcWeekday(i) {
  return timeInterval(
    date => {
      date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 7 - i) % 7))
      date.setUTCHours(0, 0, 0, 0)
    },
    (date, step) => {
      date.setUTCDate(date.getUTCDate() + step * 7)
    },
    (start, end) => {
      return (end - start) / durationWeek
    }
  )
}
var utcSunday = utcWeekday(0)
var utcMonday = utcWeekday(1)
var utcTuesday = utcWeekday(2)
var utcWednesday = utcWeekday(3)
var utcThursday = utcWeekday(4)
var utcFriday = utcWeekday(5)
var utcSaturday = utcWeekday(6)
var utcSundays = utcSunday.range
var utcMondays = utcMonday.range
var utcTuesdays = utcTuesday.range
var utcWednesdays = utcWednesday.range
var utcThursdays = utcThursday.range
var utcFridays = utcFriday.range
var utcSaturdays = utcSaturday.range

// node_modules/d3-time/src/month.js
var timeMonth = timeInterval(
  date => {
    date.setDate(1)
    date.setHours(0, 0, 0, 0)
  },
  (date, step) => {
    date.setMonth(date.getMonth() + step)
  },
  (start, end) => {
    return (
      end.getMonth() -
      start.getMonth() +
      (end.getFullYear() - start.getFullYear()) * 12
    )
  },
  date => {
    return date.getMonth()
  }
)
var timeMonths = timeMonth.range
var utcMonth = timeInterval(
  date => {
    date.setUTCDate(1)
    date.setUTCHours(0, 0, 0, 0)
  },
  (date, step) => {
    date.setUTCMonth(date.getUTCMonth() + step)
  },
  (start, end) => {
    return (
      end.getUTCMonth() -
      start.getUTCMonth() +
      (end.getUTCFullYear() - start.getUTCFullYear()) * 12
    )
  },
  date => {
    return date.getUTCMonth()
  }
)
var utcMonths = utcMonth.range

// node_modules/d3-time/src/year.js
var timeYear = timeInterval(
  date => {
    date.setMonth(0, 1)
    date.setHours(0, 0, 0, 0)
  },
  (date, step) => {
    date.setFullYear(date.getFullYear() + step)
  },
  (start, end) => {
    return end.getFullYear() - start.getFullYear()
  },
  date => {
    return date.getFullYear()
  }
)
timeYear.every = k => {
  return !isFinite((k = Math.floor(k))) || !(k > 0)
    ? null
    : timeInterval(
        date => {
          date.setFullYear(Math.floor(date.getFullYear() / k) * k)
          date.setMonth(0, 1)
          date.setHours(0, 0, 0, 0)
        },
        (date, step) => {
          date.setFullYear(date.getFullYear() + step * k)
        }
      )
}
var timeYears = timeYear.range
var utcYear = timeInterval(
  date => {
    date.setUTCMonth(0, 1)
    date.setUTCHours(0, 0, 0, 0)
  },
  (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step)
  },
  (start, end) => {
    return end.getUTCFullYear() - start.getUTCFullYear()
  },
  date => {
    return date.getUTCFullYear()
  }
)
utcYear.every = k => {
  return !isFinite((k = Math.floor(k))) || !(k > 0)
    ? null
    : timeInterval(
        date => {
          date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k)
          date.setUTCMonth(0, 1)
          date.setUTCHours(0, 0, 0, 0)
        },
        (date, step) => {
          date.setUTCFullYear(date.getUTCFullYear() + step * k)
        }
      )
}
var utcYears = utcYear.range

// node_modules/d3-time/src/ticks.js
function ticker(year, month, week, day, hour, minute) {
  const tickIntervals = [
    [second, 1, durationSecond],
    [second, 5, 5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute, 1, durationMinute],
    [minute, 5, 5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [hour, 1, durationHour],
    [hour, 3, 3 * durationHour],
    [hour, 6, 6 * durationHour],
    [hour, 12, 12 * durationHour],
    [day, 1, durationDay],
    [day, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month, 1, durationMonth],
    [month, 3, 3 * durationMonth],
    [year, 1, durationYear],
  ]
  function ticks(start, stop, count) {
    const reverse = stop < start
    if (reverse) [start, stop] = [stop, start]
    const interval =
      count && typeof count.range === 'function'
        ? count
        : tickInterval(start, stop, count)
    const ticks2 = interval ? interval.range(start, +stop + 1) : []
    return reverse ? ticks2.reverse() : ticks2
  }
  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count
    const i = bisector(([, , step2]) => step2).right(tickIntervals, target)
    if (i === tickIntervals.length)
      return year.every(
        tickStep(start / durationYear, stop / durationYear, count)
      )
    if (i === 0)
      return millisecond.every(Math.max(tickStep(start, stop, count), 1))
    const [t, step] =
      tickIntervals[
        target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target
          ? i - 1
          : i
      ]
    return t.every(step)
  }
  return [ticks, tickInterval]
}
var [utcTicks, utcTickInterval] = ticker(
  utcYear,
  utcMonth,
  utcSunday,
  unixDay,
  utcHour,
  utcMinute
)
var [timeTicks, timeTickInterval] = ticker(
  timeYear,
  timeMonth,
  timeSunday,
  timeDay,
  timeHour,
  timeMinute
)

export {
  timeInterval,
  millisecond,
  milliseconds,
  second,
  seconds,
  timeMinute,
  timeMinutes,
  utcMinute,
  utcMinutes,
  timeHour,
  timeHours,
  utcHour,
  utcHours,
  timeDay,
  timeDays,
  utcDay,
  utcDays,
  unixDay,
  unixDays,
  timeSunday,
  timeMonday,
  timeTuesday,
  timeWednesday,
  timeThursday,
  timeFriday,
  timeSaturday,
  timeSundays,
  timeMondays,
  timeTuesdays,
  timeWednesdays,
  timeThursdays,
  timeFridays,
  timeSaturdays,
  utcSunday,
  utcMonday,
  utcTuesday,
  utcWednesday,
  utcThursday,
  utcFriday,
  utcSaturday,
  utcSundays,
  utcMondays,
  utcTuesdays,
  utcWednesdays,
  utcThursdays,
  utcFridays,
  utcSaturdays,
  timeMonth,
  timeMonths,
  utcMonth,
  utcMonths,
  timeYear,
  timeYears,
  utcYear,
  utcYears,
  utcTicks,
  utcTickInterval,
  timeTicks,
  timeTickInterval,
}
//# sourceMappingURL=chunk-CCDGN2S7.js.map
