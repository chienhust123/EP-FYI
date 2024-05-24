package database

import (
	"reflect"

	"github.com/doug-martin/goqu/v9"
)

func structToRecord[T any](s *T) goqu.Record {
	v := reflect.ValueOf(s).Elem()
	t := v.Type()
	record := goqu.Record{}

	for i := 0; i < v.NumField(); i++ {
		field := t.Field(i)
		tag := field.Tag.Get("db")
		if tag != "" {
			record[tag] = v.Field(i).Interface()
		}
	}
	return record
}
